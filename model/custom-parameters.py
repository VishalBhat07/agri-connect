from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load models and label encoders
try:
    label_encoders = joblib.load("./label_encoders.joblib")
    models = {
        "min_price": joblib.load("./xgboost_model_min_price.joblib"),
        "max_price": joblib.load("./xgboost_model_max_price.joblib"),
        "modal_price": joblib.load("./xgboost_model_modal_price.joblib"),
    }
    print("Models and encoders loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")

def validate_input(data):
    """Validate that all required fields are present in the input data"""
    required_fields = ["district_name", "commodity_name", "variety", "month"]
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    return True, None

def preprocess_input(data):
    """Preprocess input data using label encoders"""
    try:
        processed_data = data.copy()
        
        # Convert month name to number if it's not already
        month_mapping = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4,
            'May': 5, 'June': 6, 'July': 7, 'August': 8,
            'September': 9, 'October': 10, 'November': 11, 'December': 12
        }
        if isinstance(processed_data['month'], str):
            processed_data['month'] = month_mapping.get(processed_data['month'])

        # Encode categorical variables
        for col in ["district_name", "commodity_name", "variety"]:
            le = label_encoders[col]
            processed_data[col] = le.transform([processed_data[col]])[0]
        
        return True, processed_data
    except Exception as e:
        return False, f"Error in preprocessing: {str(e)}"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data
        data = request.json
        
        # Validate input
        is_valid, error_message = validate_input(data)
        if not is_valid:
            return jsonify({
                'success': False,
                'error': error_message
            }), 400
        
        # Preprocess input
        success, processed_data = preprocess_input(data)
        if not success:
            return jsonify({
                'success': False,
                'error': processed_data  # Contains error message if preprocessing failed
            }), 400
        
        # Create DataFrame for prediction
        input_df = pd.DataFrame([processed_data])
        
        # Make predictions using all models
        predictions = {}
        for target, model in models.items():
            prediction = model.predict(input_df)
            predictions[target] = float(prediction[0])  # Convert numpy float to Python float
        
        return jsonify({
            'success': True,
            'predictions': predictions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/get-categories', methods=['GET'])
def get_categories():
    """Return all possible values for categorical fields"""
    try:
        categories = {
            'district_name': label_encoders['district_name'].classes_.tolist(),
            'commodity_name': label_encoders['commodity_name'].classes_.tolist(),
            'variety': label_encoders['variety'].classes_.tolist(),
            'month': [
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
            ]
        }
        
        return jsonify({
            'success': True,
            'categories': categories
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)