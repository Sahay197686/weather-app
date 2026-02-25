import axios from 'axios';

const API_KEY = '138bd856302dc20b711782fe7fb5d528';
const BASE_URL = 'http://api.weatherstack.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        access_key: API_KEY,
    },
});

export const weatherService = {
    getCurrent: async (query) => {
        try {
            const response = await apiClient.get('/current', {
                params: { query },
            });
            if (response.data.error) throw new Error(response.data.error.info);
            return response.data;
        } catch (error) {
            console.error('Weatherstack Current Error:', error);
            throw error;
        }
    },

    getForecast: async (query, days = 7) => {
        try {
            const response = await apiClient.get('/forecast', {
                params: { query, forecast_days: days },
            });
            if (response.data.error) throw new Error(response.data.error.info);
            return response.data;
        } catch (error) {
            console.error('Weatherstack Forecast Error:', error);
            throw error;
        }
    },

    getHistorical: async (query, date) => {
        try {
            const response = await apiClient.get('/historical', {
                params: { query, historical_date: date },
            });
            if (response.data.error) throw new Error(response.data.error.info);
            return response.data;
        } catch (error) {
            console.error('Weatherstack Historical Error:', error);
            throw error;
        }
    },

    getMarine: async (query) => {
        try {
            const response = await apiClient.get('/marine', {
                params: { query },
            });
            if (response.data.error) throw new Error(response.data.error.info);
            return response.data;
        } catch (error) {
            console.error('Weatherstack Marine Error:', error);
            throw error;
        }
    },

    autocomplete: async (query) => {
        try {
            const response = await apiClient.get('/autocomplete', {
                params: { query },
            });
            if (response.data.error) throw new Error(response.data.error.info);
            return response.data;
        } catch (error) {
            console.error('Weatherstack Autocomplete Error:', error);
            throw error;
        }
    },
};
