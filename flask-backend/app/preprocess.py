def validate_input(data):
    """Validate that all required fields are present in the input data"""
    required_fields = ["district", "commodity", "variety", "month"]
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    return True, None

def preprocess_input(data):
    """Preprocess input data using label encoders"""
    from app.models import label_encoders  # Import label encoders
    try:
        processed_data = data.copy()
        
        # Map frontend field names to model field names
        field_mapping = {
            'district': 'district_name',
            'commodity': 'commodity_name',
            'variety': 'variety'
        }
        
        # Convert month name to number
        month_mapping = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4,
            'May': 5, 'June': 6, 'July': 7, 'August': 8,
            'September': 9, 'October': 10, 'November': 11, 'December': 12
        }
        processed_data['month'] = month_mapping[processed_data['month']]
        
        # Create a new dict with mapped field names
        model_input = {}
        for frontend_field, model_field in field_mapping.items():
            model_input[model_field] = processed_data[frontend_field]
        model_input['month'] = processed_data['month']
        
        # Encode categorical variables
        for frontend_field, model_field in field_mapping.items():
            if model_field in label_encoders:
                le = label_encoders[model_field]
                model_input[model_field] = le.transform([model_input[model_field]])[0]
        
        return True, model_input
    except KeyError as e:
        return False, f"Invalid value provided for field: {str(e)}"
    except Exception as e:
        return False, f"Error in preprocessing: {str(e)}"
