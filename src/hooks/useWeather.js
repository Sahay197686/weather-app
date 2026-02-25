import { useState, useCallback } from 'react';
import { weatherService } from '../services/weatherApi';

export const useWeather = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [view, setView] = useState('current'); // 'current', 'forecast', 'historical', 'marine'

    const fetchWeather = useCallback(async (query, type = 'current', extraParam) => {
        setLoading(true);
        setError(null);
        try {
            let data;
            switch (type) {
                case 'forecast':
                    data = await weatherService.getForecast(query, extraParam);
                    break;
                case 'historical':
                    data = await weatherService.getHistorical(query, extraParam);
                    break;
                case 'marine':
                    data = await weatherService.getMarine(query);
                    break;
                case 'current':
                default:
                    data = await weatherService.getCurrent(query);
                    break;
            }
            setWeatherData(data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching weather data');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        weatherData,
        view,
        setView,
        fetchWeather,
    };
};
