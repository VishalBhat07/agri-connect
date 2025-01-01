# predict.py
import sys
import json
import joblib
import pandas as pd

def load_models():
    try:
        label_encoders = joblib.load("./models/label_encoders.joblib")
        models = {
            "min_price": joblib.load("./models/xgboost_model_min_price.joblib"),
            "max_price": joblib.load("./models/xgboost_model_max_price.joblib"),
            "modal_price": joblib.load("./models/xgboost_model_modal_price.joblib"),
        }
        return True, label_encoders, models
    except Exception as e:
        return False, None, str(e)

def process_prediction(input_data):
    # Load models
    success, label_encoders, models = load_models()
    if not success:
        return json.dumps({"success": False, "error": models})

    try:
        # Preprocess input
        month_mapping = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4,
            'May': 5, 'June': 6, 'July': 7, 'August': 8,
            'September': 9, 'October': 10, 'November': 11, 'December': 12
        }

        processed_data = {
            'district_name': input_data['district'],
            'commodity_name': input_data['commodity'],
            'variety': input_data['variety'],
            'month': month_mapping[input_data['month']]
        }

        # Encode categorical variables
        for field in ['district_name', 'commodity_name', 'variety']:
            if field in label_encoders:
                le = label_encoders[field]
                processed_data[field] = le.transform([processed_data[field]])[0]

        # Create DataFrame for prediction
        input_df = pd.DataFrame([processed_data])

        # Make predictions
        predictions = {}
        for target, model in models.items():
            prediction = model.predict(input_df)
            predictions[target] = float(prediction[0])

        return json.dumps({"success": True, "predictions": predictions})

    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

if __name__ == "__main__":
    # Read input from stdin
    input_data = json.loads(sys.stdin.read())
    result = process_prediction(input_data)
    print(result)