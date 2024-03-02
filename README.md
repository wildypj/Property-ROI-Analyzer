Property ROI Analyzer 

PropertyROIAnalyzer is a web application designed to analyze the Return on Investment (ROI) for different properties. 
It allows users to input a property URL, fetch relevant data from the Zillow API on RapidAPI, and calculate the ROI 
based on various factors such as price, rental income, expenses, and mortgage rates.

Features
* Property Data Retrieval: The application retrieves property data from the Zillow API via RapidAPI based on the provided property URL.
* ROI Calculation: It calculates the ROI for the property by considering factors such as purchase price, rental income, expenses, and mortgage rates.
* Dynamic Display: The application dynamically updates the property details and ROI calculation results on the web page using JavaScript and AJAX requests.
* Cache Implementation: Utilizes a cache mechanism to store fetched property data, reducing the number of API requests and improving application performance.

Technologies Used
* HTML: Used for structuring the web page and creating user interface elements.
* CSS: Utilized for styling the web page layout and design.
* JavaScript: Used for client-side scripting to handle form submission, make AJAX requests, and update the UI.
* jQuery: JavaScript library used for simplifying DOM manipulation and AJAX requests.
* Python: Backend language used for implementing the Flask web server and handling HTTP requests.
* Flask: Micro web framework for Python used to develop the backend of the web application.

Files
* index.html: The main HTML file that contains the structure of the web page and user interface elements for property search.
* property_search.js: JavaScript file responsible for handling form submission, making AJAX requests to fetch property data, and updating the UI with the results.
* styles.css: CSS file containing styles for the web page layout and design.
* app.py: Python Flask application that serves as the backend of the web application. It handles HTTP requests, fetches property data, and calculates ROI.
* property_api_interaction.py: Python module for interacting with the Zillow API on RapidAPI to fetch property data based on the provided URL.
* calculate.py: Python module containing functions for calculating ROI based on property data.

Getting Started
* 		Clone the repository to your local machine.
* 		Install the required dependencies listed in requirements.txt.
* 		Obtain an API key for the Zillow API from RapidAPI.
* 		Configure the API key in property_api_interaction.py.
* 		Run the Flask application by executing python3 app.py.
* 		Access the application in your web browser at http://localhost:5000.

Usage
* 		Open the web application in your browser.
* 		Enter the URL of the property you want from the Zillow website to analyze in the provided input field.
* 		Click the "Search" button.
* 		View the property details and ROI calculation results displayed on the web page.

Dependencies
* Flask
* Requests
* Pandas

Zillow API from RapidAPI
This application utilizes the Zillow API from RapidAPI to fetch property data. You need to sign up for a RapidAPI account and subscribe to the Zillow API to obtain an API key. Once you have the API key, configure it in property_api_interaction.py to enable property data retrieval.
Notes
* The Zillow API on RapidAPI provides access to various endpoints for fetching property data. Ensure that you have subscribed to the required endpoints based on your application's needs.
* This application is for demonstration purposes and may require further customization or adaptation for production use.
