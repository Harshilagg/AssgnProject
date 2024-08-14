// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888'; // Adjust the URL if necessary

// export const getTotalCount = async () => {
//     const response = await axios.get(`${API_URL}/total-count`);
//     console.log(response.data)
//     return response.data;
// };

// export const getAverageIntensity = async () => {
//     const response = await axios.get(`${API_URL}/average-intensity`);
//     return response.data;
// };

// export const getCountBySector = async () => {
//     const response = await axios.get(`${API_URL}/count-by-sector`);
//     return response.data;
// };

// export const getCountByRegion = async () => {
//     const response = await axios.get(`${API_URL}/count-by-region`);
//     return response.data;
// };

// export const getDocumentsByCountry = async (country) => {
//     const response = await axios.get(`${API_URL}/documents-by-country/${country}`);
//     return response.data;
// };
export const fetchMetricData = async (metric, filters) => {
    try {
        // Build the query string from filters
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/metrics/${metric}?${query}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
