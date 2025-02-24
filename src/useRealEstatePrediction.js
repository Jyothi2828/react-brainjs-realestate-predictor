import { useState, useEffect } from 'react';
import { trainNetwork, predictPrice } from './neuralNetwork';

const useRealEstatePrediction = () => {
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [propertyInput, setPropertyInput] = useState({
        Area: "",
        Bedrooms: "",
        Bathrooms: "",
        Location: "",
        "Age of Property": ""
    });

    useEffect(() => {
        trainNetwork((stats) => {
            console.log(`Training: ${stats.iterations} iterations`);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPropertyInput(prevInput => ({ ...prevInput, [name]: value }));
    };

    const handlePredictPrice = () => {
        const predictedPriceValue = predictPrice(propertyInput);
        setPredictedPrice(predictedPriceValue);
    };

    return {
        predictedPrice,
        propertyInput,
        handleInputChange,
        handlePredictPrice
    };
};

export default useRealEstatePrediction;
