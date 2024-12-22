import pandas as pd

# Step 1: Load the CSV file
file_path = "./Karnataka-crop-prices-2023.csv"  # Path to the uploaded file
df = pd.read_csv(file_path)

# Step 2: Remove unnecessary columns
columns_to_remove = [
    "id", "state_id", "state_name", "district_id", "market_name",
    "census_state_id", "census_state_name", "census_district_name",
    "commodity_id", "grade"
]
df = df.drop(columns=columns_to_remove)

# Step 3: Keep specific columns
columns_to_keep = [
    "district_name", "commodity_name", "variety",
    "min_price", "modal_price", "max_price", "date"
]
df = df[columns_to_keep]

# Step 4: Modify the "date" column to extract the "month"
df["month"] = pd.to_datetime(df["date"]).dt.month

# Drop the original "date" column
df = df.drop(columns=["date"])

# Step 5: Save the processed data to a new CSV file
output_path = "./Karnataka-crop-prices-processed.csv"
df.to_csv(output_path, index=False)

print(f"Processed file saved to: {output_path}")
