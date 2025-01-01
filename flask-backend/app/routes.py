from flask import Blueprint, request, jsonify
from app.preprocess import validate_input, preprocess_input
from app.models import models
import pandas as pd

main = Blueprint('main', __name__)

@main.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data
        data = request.json
        
        # Validate input
        is_valid, error_message = validate_input(data)
        if not is_valid:
            return jsonify({'success': False, 'error': error_message}), 400
        
        # Preprocess input
        success, processed_data = preprocess_input(data)
        if not success:
            return jsonify({'success': False, 'error': processed_data}), 400
        
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
        return jsonify({'success': False, 'error': str(e)}), 500
