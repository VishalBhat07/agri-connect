import pandas as pd
import joblib

# Load the saved label encoders and models
label_encoders = joblib.load("./label_encoders.joblib")
models = {
    "min_price": joblib.load("./xgboost_model_min_price.joblib"),
    "max_price": joblib.load("./xgboost_model_max_price.joblib"),
    "modal_price": joblib.load("./xgboost_model_modal_price.joblib"),
}

# Step 1: Define custom input values
# Example custom values for testing:
custom_data = {
    "district_name": "Belgaum",     # Replace with your custom district
    "commodity_name": "Cotton",       # Replace with your custom commodity
    "variety": "GCH",       # Replace with your custom variety
    "month": 1                      # Replace with your custom month (e.g., May = 5)
}

# Step 2: Encode categorical variables
for col in ["district_name", "commodity_name", "variety"]:
    le = label_encoders[col]
    custom_data[col] = le.transform([custom_data[col]])[0]  # Transform and get the encoded value

# Step 3: Prepare the custom input as a DataFrame
custom_input = pd.DataFrame([custom_data])

# Step 4: Make predictions using the trained models
predictions = {}
for target, model in models.items():
    prediction = model.predict(custom_input)
    predictions[target] = prediction[0]  # Store the prediction

# Step 5: Display the predictions
print("Predictions for the custom input values:")
for target, prediction in predictions.items():
    print(f"{target.capitalize()}: {prediction:.2f}")
