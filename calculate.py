import pandas as pd

# Set pandas option to opt-in to future behavior for downcasting object dtype arrays
pd.set_option('future.no_silent_downcasting', True)

def calculate_roi(property_data):
    # Define the keys needed for ROI calculation
    keys_needed = ['price', 'zestimate', 'rentZestimate', 'mortgageRates', 'taxAnnualAmountpropertyTaxRate', 'hoaFee', 'annualHomeownersInsurance']

    # Create a new dictionary containing only the necessary keys
    filtered_data = {key: property_data.get(key) for key in keys_needed}

    # Create a DataFrame from the filtered data
    df = pd.DataFrame(filtered_data, index=[0])

    # Perform data preprocessing if needed
    
    # Fill null values with appropriate defaults
    df['listed_price'] = df['price'].fillna(0)  # Assuming 0 as default listed price if missing
    df['zestimate_price'] = df['zestimate'].fillna(0)  # Assuming 0 as default zestimate price if missing
    df['rent_zestimate'] = df['rentZestimate'].fillna(1372)  # Default rent zestimate ($1,372)
    if 'mortgageRates' in filtered_data:
        df['mortgage_rate'] = filtered_data['mortgageRates'].get('thirtyYearFixedRate', 6.5) / 100  # Convert percentage to decimal
    else:
        # If the key is missing, set the default mortgage rate to 6.5%
        df['mortgage_rate'] = 6.5 / 100  # Default mortgage rate of 6.5%
    
    df['property_tax_rate'] = df['taxAnnualAmountpropertyTaxRate'] / 100  # Convert percentage to decimal
    df['hoa_fee'] = df['hoaFee'].fillna(250).infer_objects()  # Opt-in to future behavior
    df['annual_insurance'] = df['annualHomeownersInsurance'].fillna(750)  # National median annual homeowner’s insurance premium ($750)
    
    # Handle NaN values in the DataFrame
    df.fillna(0, inplace=True)  # Replace NaN values with 0
    
    # Calculate Purchase Price
    df['purchase_price'] = df['listed_price'].fillna(df['zestimate_price'])
    
    # Calculate Initial Investment (assuming 10% down payment)
    df['initial_investment'] = df['purchase_price'] * 0.1
    
    # Calculate Annual Rental Income
    df['annual_rental_income'] = df['rent_zestimate'] * 12
    
    # Calculate Annual Expenses
    df['property_taxes'] = df['purchase_price'] * df['property_tax_rate']
    df['maintenance_costs'] = df['purchase_price'] * 0.03  # Assuming 3% for maintenance
    df['vacancy_rate'] = df['annual_rental_income'] * 0.05  # Assuming 5% vacancy rate
    df['property_management_fees'] = df['annual_rental_income'] * 0.1  # Assuming 10% property management fees
    df['utilities'] = 1500  # Assuming $1500 annually for utilities
    df['annual_expenses'] = df['property_taxes'] + df['hoa_fee'] + df['annual_insurance'] + df['maintenance_costs'] + df['vacancy_rate'] + df['property_management_fees'] + df['utilities']
    
    # Calculate Net Operating Income (NOI)
    df['noi'] = df['annual_rental_income'] - df['annual_expenses']
    
    # Calculate Mortgage Payment
    n = 30 * 12  # Assuming 30-year mortgage
    df['mortgage_payment'] = (df['purchase_price'] - 0.2 * df['purchase_price']) * (df['mortgage_rate']/12) / (1 - (1 + df['mortgage_rate']/12)**-n)
    
    # Calculate Cash Flow
    df['cash_flow'] = df['noi'] - df['mortgage_payment']
    
    # Calculate ROI
    df['equity_growth'] = (df['zestimate_price'] - df['purchase_price']) / df['initial_investment']
    df['roi'] = (df['cash_flow'] + df['equity_growth']) / df['initial_investment'] * 100  # Convert to percentage
    
    return df['roi'].values[0]
