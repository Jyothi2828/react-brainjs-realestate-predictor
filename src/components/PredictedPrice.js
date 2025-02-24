// components/PredictedPrice.js
import React from 'react';

const PredictedPrice = ({ predictedPrice }) => {
    return (
        <div>
            <p>Predicted Price: {predictedPrice !== null ? `$${predictedPrice.toFixed(2)}` : 'Not available'}</p>
        </div>
    );
};

export default PredictedPrice;
