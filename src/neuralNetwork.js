import * as brain from 'brain.js';
import realEstateData from './data/realestate.json';

// One-hot encode locations
// One-hot encode locations
function encodeLocation(location) {
    const locationMap = {
        'Downtown': [1, 0, 0],
        'Suburban': [0, 1, 0],
        'Rural': [0, 0, 1]
    };

    if (!location || location === "none" || location === "") {
        return [0, 0, 0]; // Default encoding for empty or invalid location
    }

    return locationMap[location] || [0, 0, 0]; // Default if unknown
}


// Normalize numerical data
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

function denormalize(value, min, max) {
    return value * (max - min) + min;
}

// Find min and max values
const areas = realEstateData.map(item => parseInt(item.Area));
const bedrooms = realEstateData.map(item => parseInt(item.Bedrooms));
const bathrooms = realEstateData.map(item => parseInt(item.Bathrooms));
const ages = realEstateData.map(item => parseInt(item["Age of Property"]));
const prices = realEstateData.map(item => parseInt(item.Price));

export const maxArea = Math.max(...areas);
export const minArea = Math.min(...areas);
export const maxBedrooms = Math.max(...bedrooms);
export const minBedrooms = Math.min(...bedrooms);
export const maxBathrooms = Math.max(...bathrooms);
export const minBathrooms = Math.min(...bathrooms);
export const maxAge = Math.max(...ages);
export const minAge = Math.min(...ages);
export const maxPrice = Math.max(...prices);
export const minPrice = Math.min(...prices);

// Prepare training data
const trainingData = realEstateData.map(item => ({
    input: {
        area: normalize(parseInt(item.Area), minArea, maxArea),
        bedrooms: normalize(parseInt(item.Bedrooms), minBedrooms, maxBedrooms),
        bathrooms: normalize(parseInt(item.Bathrooms), minBathrooms, maxBathrooms),
        age: normalize(parseInt(item["Age of Property"]), minAge, maxAge),
        ...Object.fromEntries(encodeLocation(item.Location).map((value, index) => [`location${index + 1}`, value]))
    },
    output: {
        price: normalize(parseInt(item.Price), minPrice, maxPrice)
    }
}));

// Create and train the network
const net = new brain.NeuralNetwork({ hiddenLayers: [4, 4] });

export function trainNetwork(callback) {
    net.train(trainingData, {
        iterations: 10000,
        log: true,
        logPeriod: 500,
        learningRate: 0.01,
        callback: callback,
        callbackPeriod: 500
    });
}

export function predictPrice(property) {
    const encodedLocation = encodeLocation(property.Location);
    const input = {
        area: normalize(parseInt(property.Area), minArea, maxArea),
        bedrooms: normalize(parseInt(property.Bedrooms), minBedrooms, maxBedrooms),
        bathrooms: normalize(parseInt(property.Bathrooms), minBathrooms, maxBathrooms),
        age: normalize(parseInt(property["Age of Property"]), minAge, maxAge),
        ...Object.fromEntries(encodedLocation.map((value, index) => [`location${index + 1}`, value]))
    };

    const normalizedPrice = net.run(input).price;
    return denormalize(normalizedPrice, minPrice, maxPrice);
}
