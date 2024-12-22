import pandas as pd
import joblib
from sklearn.metrics import mean_squared_error, r2_score

# Step 1: Load the test dataset
file_path = "./Karnataka-crop-prices-processed.csv"
data = pd.read_csv(file_path)

# Load the encoders
label_encoders = joblib.load("./label_encoders.joblib")

# Encode categorical columns (same process as training)
for col in ["district_name", "commodity_name", "variety"]:
    le = label_encoders[col]
    data[col] = le.transform(data[col])

# Keep the same features and targets
X = data[["district_name", "commodity_name", "variety", "month"]]
y = data[["min_price", "max_price", "modal_price"]]

# Split into training and testing sets
from sklearn.model_selection import train_test_split
_, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 2: Load the saved models
models = {
    "min_price": joblib.load("./xgboost_model_min_price.joblib"),
    "max_price": joblib.load("./xgboost_model_max_price.joblib"),
    "modal_price": joblib.load("./xgboost_model_modal_price.joblib"),
}

# Step 3: Predict and evaluate accuracy
results = {}
for target, model in models.items():
    # Make predictions
    y_pred = model.predict(X_test)

    # Evaluate the predictions
    mse = mean_squared_error(y_test[target], y_pred)
    r2 = r2_score(y_test[target], y_pred)
    accuracy = r2 * 100  # Convert R2 to percentage accuracy

    # Store the results
    results[target] = {
        "MSE": mse,
        "R2": r2,
        "Accuracy (%)": accuracy
    }

# Step 4: Display the results
print("Model Evaluation Results:")
for target, metrics in results.items():
    print(f"\n{target} Model:")
    print(f"  Mean Squared Error (MSE): {metrics['MSE']:.2f}")
    print(f"  R-Squared (R2): {metrics['R2']:.2f}")
    print(f"  Accuracy: {metrics['Accuracy (%)']:.2f}%")
