import { useState, useCallback, useEffect } from 'react';
import { weatherService } from '../services/weatherApi';

// High-fidelity fallback data for Demo Mode
const DEMO_DATA = {
    current: {
        observation_time: '12:00 PM',
        temperature: 22,
        weather_code: 113,
        weather_icons: ['https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sun.png'],
        weather_descriptions: ['Sunny'],
        wind_speed: 15,
        wind_degree: 180,
        wind_dir: 'S',
        pressure: 1012,
        precip: 0,
        humidity: 45,
        cloudcover: 0,
        feelslike: 24,
        uv_index: 5,
        visibility: 16
    },
    location: {
        name: 'San Francisco',
        country: 'United States',
        region: 'California',
        lat: '37.775',
        lon: '-122.419',
        timezone_id: 'America/Los_Angeles',
        localtime: '2026-02-25 10:00',
        utc_offset: '-8.0'
    }
};

export const useWeather = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [view, setView] = useState('current');
    const [demoMode, setDemoMode] = useState(false);

    // Initial load from cache
    useEffect(() => {
        const cachedPath = localStorage.getItem('lastWeatherData');
        if (cachedPath) {
            try {
                setWeatherData(JSON.parse(cachedPath));
                setDemoMode(true); // Treat cached data as persistent demo
            } catch (e) {
                console.error('Cache read error:', e);
            }
        }
    }, []);

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
            setDemoMode(false);
            localStorage.setItem('lastWeatherData', JSON.stringify(data));
        } catch (err) {
            console.error('Weather Fetch Error:', err);

            // Handle Rate Limit (429) gracefully
            if (err.message?.includes('429') || err.message?.includes('limit')) {
                setError('API Rate Limit Exceeded. Activating Demo Mode Satellite Link.');
                if (!weatherData) {
                    setWeatherData(DEMO_DATA);
                }
                setDemoMode(true);
            } else {
                setError(err.message || 'Connecting to satellites...');
            }
        } finally {
            setLoading(false);
        }
    }, [weatherData]);

    return {
        loading,
        error,
        weatherData,
        view,
        setView,
        fetchWeather,
        demoMode
    };
};
