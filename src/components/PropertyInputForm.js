import React, { useState } from 'react';
import '../styles/formStyles.css';
import { validatePropertyInput } from '../utils/formValidation';  // Import the validation function

const PropertyInputForm = ({ propertyInput, handleInputChange, handlePredictPrice, predictedPrice }) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validatePropertyInput(propertyInput);  // Use the validation function

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            handlePredictPrice();
        } else {
            console.log("Form has errors, not submitting");  // Add this line for logging errors
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Area (sqft) :</label>
                    <input 
                        type="number" 
                        name="Area" 
                        value={propertyInput.Area} 
                        onChange={handleInputChange} 
                        required 
                    />
                    {errors.Area && <div className="error">{errors.Area}</div>}
                </div>
                <div className="input-group">
                    <label>Bedrooms :</label>
                    <input 
                        type="number" 
                        name="Bedrooms" 
                        value={propertyInput.Bedrooms} 
                        onChange={handleInputChange} 
                        required 
                    />
                    {errors.Bedrooms && <div className="error">{errors.Bedrooms}</div>}
                </div>
                <div className="input-group">
                    <label>Bathrooms :</label>
                    <input 
                        type="number" 
                        name="Bathrooms" 
                        value={propertyInput.Bathrooms} 
                        onChange={handleInputChange} 
                        required 
                    />
                    {errors.Bathrooms && <div className="error">{errors.Bathrooms}</div>}
                </div>
                <div className="input-group">
                    <label>Location :</label>
                    <div className="radio-input">
                        {['Downtown', 'Suburban', 'Rural'].map((location) => (
                            <React.Fragment key={location}>
                                <input 
                                    type="radio" 
                                    id={location} 
                                    name="Location" 
                                    value={location} 
                                    checked={propertyInput.Location === location}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={location}>{location}</label>
                            </React.Fragment>
                        ))}
                        <span className="selection"></span>
                    </div>
                </div>
                <div className="input-group">
                    <label>Age of Property :</label>
                    <input 
                        type="number" 
                        name="Age of Property" 
                        value={propertyInput["Age of Property"]} 
                        onChange={handleInputChange} 
                        required 
                    />
                    {errors['Age of Property'] && <div className="error">{errors['Age of Property']}</div>}
                </div>
                <button className="btn-12" type="submit">
                    <span>Predict Price</span>
                </button>
            </form>

            {predictedPrice !== null && (
                <div className="form-container-predicted-price">
                    <h3 className="title">Estimated Price: ${predictedPrice.toLocaleString()}</h3>
                </div>
            )}
        </div>
    );
};

export default PropertyInputForm;
