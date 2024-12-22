import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib

# Step 1: Load the processed dataset
file_path = "./Karnataka-crop-prices-processed.csv"
data = pd.read_csv(file_path)

# Step 2: Encode categorical columns (district_name, commodity_name, variety)
label_encoders = {}
for col in ["district_name", "commodity_name", "variety"]:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le  # Save the encoder for future use

# Step 3: Set up X (features) and y (targets)
X = data[["district_name", "commodity_name", "variety", "month"]]
y = data[["min_price", "max_price", "modal_price"]]

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train the XGBoost model for each target variable
models = {}
for target in ["min_price", "max_price", "modal_price"]:
    model = xgb.XGBRegressor(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=50,
        random_state=42
    )
    model.fit(X_train, y_train[target])
    models[target] = model

# Step 6: Save the trained models and encoders
# Save models
for target, model in models.items():
    joblib.dump(model, f"./xgboost_model_{target}.joblib")

# Save label encoders
joblib.dump(label_encoders, "./label_encoders.joblib")

print("Models and encoders have been saved successfully!")
