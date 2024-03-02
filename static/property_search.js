$(document).ready(function() {
    $("#property-form").submit(function(event) {
        event.preventDefault(); // Prevent form submission
        var propertyUrl = $("#property_url").val(); // Get the property URL from the input field
        $.ajax({
            type: "POST", // HTTP method
            url: "/property", // URL to send the request
            data: { property_url: propertyUrl }, // Data to send in the request body
            dataType: 'json', // Specify JSON data type
            success: function(data) {
                // Display property details in HTML
                const detailsHtml = `
                    <div id="property-details-1" class="property-details-container">
                        <h2 onclick="toggleAccordion('property-details-1')">Property Details <span class="accordion-icon">+</span></h2>
                        <div class="details-content">
                            ${generatePropertyHtml(data, [
                                "Price", "Living Area", "Bedrooms", "Bathrooms (Full)", "Bathrooms", "Lot Size", "Basement", "Attic",
                                "Level", "Property Type Dimension", "Lot Size Dimensions", "Parking Features", "Has Open Parking", "Parking",
                                "Year Built", "Property Condition", "Time on Zillow", "Heating", "Garage Spaces", "Structure Type",
                                "Has Attached Garage", "Fireplaces", "Home Status"
                            ])}
                        </div>
                    </div>

                    <div id="property-details-2" class="property-details-container">
                        <h2 onclick="toggleAccordion('property-details-2')">Property Location <span class="accordion-icon">+</span></h2>
                        <div class="details-content">
                            <div class="property-details-row">
                                <span class="detail-label">Address:</span>
                                <span class="detail-value">${data.address.streetAddress || "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">City:</span>
                                <span class="detail-value">${data.address.city || "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">state:</span>
                                <span class="detail-value">${data.address.state || "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Zip Code:</span>
                                <span class="detail-value">${data.address.zipcode || "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">County:</span>
                                <span class="detail-value">${data.county || "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">City Region:</span>
                                <span class="detail-value">${data.cityRegion || "N/A"}</span>
                            </div>
                        </div>
                    </div>


                    <div id="property-details-3" class="property-details-container">
                        <h2 onclick="toggleAccordion('property-details-3')">Nearby Schools <span class="accordion-icon">+</span> </h2>
                        <div class="details-content">
                            ${generateNearbySchoolsHtml(data)}
                        </div>
                    </div>


                    <div id="property-details-4" class="property-details-container">
                        <h2 onclick="toggleAccordion('property-details-4')">Property Cost <span class="accordion-icon">+</span></h2>
                        <div class="details-content">
                            <div class="property-details-row">
                                <span class="detail-label">Zestimate:</span>
                                <span class="detail-value">${data.zestimate|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Rent Zestimate:</span>
                                <span class="detail-value">${data.rentZestimate|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Mortgage Rates:</span>
                                <span class="detail-value">${data.mortgageRates.thirtyYearFixedRate|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Tax Annual Amount:</span>
                                <span class="detail-value">${data.taxAnnualAmountpropertyTaxRate|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Property Tax Rate:</span>
                                <span class="detail-value">${data.propertyTaxRate|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">HOA Fee:</span>
                                <span class="detail-value">${data.hoaFee|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Association Fee:</span>
                                <span class="detail-value">${data.associationFee|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Annual Homeowners Insurance":</span>
                                <span class="detail-value">${data.annualHomeownersInsurance|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Fee:</span>
                                <span class="detail-value">${data.fee|| "N/A"}</span>
                            </div>
                            <div class="property-details-row">
                                <span class="detail-label">Fees and Dues:</span>
                                <span class="detail-value">${data.feesAndDues|| "N/A"}</span>
                            </div>
                        </div>
                    </div>


                    <!-- Display ROI -->
                    <div id="property-details-5" class="property-details-container">
                        <h2 onclick="toggleAccordion('property-details-5')">ROI <span class="accordion-icon">+</span></h2>
                        <div class="details-content">
                            <div class="property-details-row">
                                <span class="detail-label">ROI:</span>
                                <span class="detail-value" id="roi-value">Calculating...</span>
                            </div>
                        </div>
                    </div>
                `;
                // Update HTML content
                $("#property-details").html(detailsHtml);
                // Start asynchronous ROI calculation
                calculateROI(data);
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error(error);
                alert("Error fetching property details.");
            }
        });
    });
});

// Function to toggle accordion
function toggleAccordion(id) {
    const accordionItem = document.getElementById(id);
    const icon = accordionItem.querySelector('.accordion-icon');
    const isCollapsed = accordionItem.classList.toggle('collapsed');
    
    // Set the icon text content based on the accordion state
    icon.textContent = isCollapsed ? '+' : '-';
}

// Function to calculate ROI asynchronously
function calculateROI(data) {
    // Simulate asynchronous calculation with setTimeout
    setTimeout(function() {
        // Perform ROI calculation (replace this with your actual calculation logic)
        const roi = performROICalculation(data);
        // Update ROI value in HTML
        $("#roi-value").text(roi.toFixed(2) + "%");
    }, 2000); // Adjust the delay as needed
}

// Function to perform ROI calculation (replace this with your actual calculation logic)
function performROICalculation(data) {
    // Example calculation: ROI = (Rent Zestimate / Zestimate) * 100
    const rentZestimate = data.rentZestimate || 0;
    const zestimate = data.zestimate || 0;
    return (rentZestimate / zestimate) * 100;
}

// Function to generate HTML for a subset of property details
function generatePropertyHtml(data, fields) {
    return fields.map(field => {
        const value = data[findKeyIgnoreCase(data, field)];
        if (value !== undefined && value !== null) {
            return `
                <div class="property-details-row">
                    <span class="detail-label">${field}:</span>
                    <span class="detail-value">${typeof value === 'number' ? value.toLocaleString() : value}</span>
                </div>`;
        } else {
            // If the field is missing or has a null/undefined value, display a placeholder
            return `
                <div class="property-details-row">
                    <span class="detail-label">${field}:</span>
                    <span class="detail-value">N/A</span>
                </div>`;
        }
    }).join('');
}

// Function to find the key in data object case-insensitively
function findKeyIgnoreCase(data, key) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].replace(/\s/g, '').toLowerCase() === key.replace(/\s/g, '').toLowerCase()) {
            return keys[i];
        }
    }
    return null; // Return null if key is not found
}

// Function to generate HTML for Nearby Schools section
function generateNearbySchoolsHtml(data) {
    if (data.schools && data.schools.length > 0) {
        return data.schools.map(school => `
            <div class="property-details-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${school.name}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Level:</span>
                <span class="detail-value">${school.level}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Grades:</span>
                <span class="detail-value">${school.grades}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${school.type}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Rating:</span>
                <span class="detail-value">${school.rating}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Students Per Teacher:</span>
                <span class="detail-value">${school.studentsPerTeacher}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Size:</span>
                <span class="detail-value">${school.size}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Distance:</span>
                <span class="detail-value">${school.distance}</span>
            </div>
            <div class="property-details-row">
                <span class="detail-label">Link:</span>
                <span class="detail-value"><a href="${school.link}">${school.link}</a></span>
            </div>
        `).join('');
    }
    return '<p>No nearby schools found.</p>';
}