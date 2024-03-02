from flask import Flask, render_template, request, jsonify
import json
from property_api_interaction import extract_zpid_from_url, fetch_property_data,  extract_and_store_keys, PropertyDataNotFoundError
from calculate import calculate_roi  # Import calculate_roi function
import traceback  # Import traceback module

app = Flask(__name__, template_folder='templates', static_folder='static')

# Create a dictionary to store cached property data
property_cache = {}

# Home page route
@app.route('/')
def home():
    return render_template('index.html')

# Property detail page route
@app.route('/property', methods=['POST'])
def property_details():
    try:
        property_url = request.form['property_url']
        
        # Check if property data is already in cache
        if property_url in property_cache:
            json_data = property_cache[property_url]
        else:
            zpid = extract_zpid_from_url(property_url)
            json_data = fetch_property_data(zpid)  # Fetch property data using zpid
            property_cache[property_url] = json_data  # Store data in cache
            # Extract and store keys if property data is fetched successfully
            file_path = extract_and_store_keys(json_data, zpid)

        if json_data:
            # Calculate ROI
            roi = calculate_roi(json_data)
            json_data['roi'] = roi  # Add ROI to property data
            
            return jsonify(json_data)  # Return JSON data directly
        else:
            raise PropertyDataNotFoundError("Property details not found.")
    except PropertyDataNotFoundError as e:
        return jsonify({'error': str(e)}), 404  # Return 404 status code for data not found
    except Exception as e:
        # Log the exception details
        traceback.print_exc()
        return jsonify({'error': "An error occurred while fetching property details."}), 500  # Return 500 status code for other errors

if __name__ == '__main__':
    app.run(debug=True)
