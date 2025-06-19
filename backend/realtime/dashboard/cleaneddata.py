import uuid
from datetime import datetime

def clean_for_json(data):
    if isinstance(data, dict):
        return {key: clean_for_json(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [clean_for_json(item) for item in data]
    elif isinstance(data, uuid.UUID):
        return str(data)
    elif isinstance(data, datetime):
        return data.isoformat()  
    else:
        return data
