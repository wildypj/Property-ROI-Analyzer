import requests
import json
import os
import re

class PropertyDataNotFoundError(Exception):
    pass

def extract_zpid_from_url(property_url):
    pattern = r'/(\d+)_zpid/?$'  
    match = re.search(pattern, property_url)
    if match:
        return match.group(1)
    else:
        raise PropertyDataNotFoundError("ZPID not found in the URL.")

def fetch_property_data(zpid):
    url = "https://zillow-com1.p.rapidapi.com/property"
    querystring = {"zpid": zpid}
    headers = {
        "X-RapidAPI-Key": "Enter your own API key ",
        "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()

def extract_and_store_keys(json_data, zpid):
    try:
        keys_to_extract = [
            "price", "livingArea", "bedrooms","bathroomsFull", "bathrooms", "lotSize",
            "basement", "attic","level" ,"propertyTypeDimension",
            "lotSizeDimensions", "parkingFeatures", "hasOpenParking", "parking",
            "yearBuilt", "propertyCondition",  "timeOnZillow", "heating",
            "garageSpaces", "structureType", "hasAttachedGarage",
            "fireplaces", "homeStatus",
            
			"zestimate", "rentZestimate", "mortgageRates", "taxAnnualAmount"
            "propertyTaxRate", "hoaFee", "hoaFeeTotal", "associationFee",
            "annualHomeownersInsurance", "fee","feesAndDues",
        
        
        	"address", "county",
            "cityRegion",
            

            "school"
        ]
        extracted_data = {key: json_data.get(key) for key in keys_to_extract}
        property_data_dir = os.path.join("property_data", zpid)
        os.makedirs(property_data_dir, exist_ok=True)
        file_path = os.path.join(property_data_dir, 'extracted_data.json')
        with open(file_path, 'w') as file:
            json.dump(extracted_data, file, indent=4)
        print(f"Extracted data stored in: {file_path}")
        return file_path  # Add this line to return the file path
    except Exception as e:
        print(f"Error extracting and storing keys: {e}")




