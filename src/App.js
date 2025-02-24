// App.js
import React from 'react';
import './App.css';
import PropertyInputForm from './components/PropertyInputForm';
import useRealEstatePrediction from './useRealEstatePrediction';

const App = () => {
    const {
        predictedPrice,
        propertyInput,
        handleInputChange,
        handlePredictPrice
    } = useRealEstatePrediction();

    return (
        <div className="App">
            <h1 id="heading">Real Estate Price Predictor</h1>
            <PropertyInputForm
                propertyInput={propertyInput}
                handleInputChange={handleInputChange}
                handlePredictPrice={handlePredictPrice}
                predictedPrice={predictedPrice}
            />
        </div>
    );
};

export default App;
