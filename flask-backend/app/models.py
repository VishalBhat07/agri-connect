import joblib

# Load models and label encoders
try:
    label_encoders = joblib.load("./models/label_encoders.joblib")
    models = {
        "min_price": joblib.load("./models/xgboost_model_min_price.joblib"),
        "max_price": joblib.load("./models/xgboost_model_max_price.joblib"),
        "modal_price": joblib.load("./models/xgboost_model_modal_price.joblib"),
    }
    print("Models and encoders loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")
