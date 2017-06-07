schema_types = {
    'integer': int,
    'string': str
}


def process_data(data, schema):
    coerced_data = {}
    for key, description in schema.items():
        if description.get('required') and key not in data.keys():
            return None
        described_type = schema_types[description['type']]
        data_value = data.get(key, '')
        if not isinstance(data_value, described_type):
            if description['type'] == 'integer':
                if data_value.isdigit():
                    coerced_data[key] = int(data_value)
                else:
                    return None
        else:
            coerced_data[key] = data_value
    return coerced_data
