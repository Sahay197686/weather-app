import React from 'react';
import { Calendar, Sun, CloudRain, CloudLightning, Wind, Cloud } from 'lucide-react';
import GlassCard from './GlassCard';

const ForecastDay = ({ day, temp, icon: Icon, condition, date }) => (
    <div className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:scale-105 group">
        <p className="text-xs text-white/40 font-black uppercase tracking-widest">{date}</p>
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <Icon className="text-blue-400" size={32} />
        </div>
        <div className="text-center">
            <p className="text-2xl font-black text-white">{temp}°</p>
            <p className="text-[10px] text-white/60 font-bold uppercase tracking-tighter mt-1">{condition}</p>
        </div>
    </div>
);

const ForecastView = ({ data }) => {
    // Mock data if real forecast is unavailable (standard for realistic SaaS demos)
    const mockForecast = [
        { date: 'Mon', temp: 24, icon: Sun, condition: 'Sunny' },
        { date: 'Tue', temp: 22, icon: Cloud, condition: 'Overcast' },
        { date: 'Wed', temp: 19, icon: CloudRain, condition: 'Showers' },
        { date: 'Thu', temp: 21, icon: Sun, condition: 'Clear' },
        { date: 'Fri', temp: 18, icon: CloudLightning, condition: 'Storms' },
    ];

    const forecast = data || mockForecast;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {forecast.map((item, idx) => (
                <ForecastDay key={idx} {...item} />
            ))}
        </div>
    );
};

export default ForecastView;
