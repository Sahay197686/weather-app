import React from 'react';
import { Wind, Droplets, Cloud, Thermometer, Eye, Sun } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const DetailItem = ({ icon: Icon, label, value, colorClass }) => (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between transition-all hover:bg-white/10 group">
        <Icon className={twMerge("transition-transform group-hover:scale-110", colorClass)} size={20} />
        <div className="mt-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold tracking-tighter">{label}</p>
            <p className="text-lg font-bold text-white">{value}</p>
        </div>
    </div>
);

const WeatherDetails = ({ current }) => {
    if (!current) return null;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailItem
                icon={Thermometer}
                label="Feels Like"
                value={`${current.feelslike}°`}
                colorClass="text-amber-400"
            />
            <DetailItem
                icon={Wind}
                label="Wind Speed"
                value={`${current.wind_speed} km/h`}
                colorClass="text-cyan-400"
            />
            <DetailItem
                icon={Droplets}
                label="Humidity"
                value={`${current.humidity}%`}
                colorClass="text-blue-400"
            />
            <DetailItem
                icon={Cloud}
                label="Cloud Cover"
                value={`${current.cloudcover}%`}
                colorClass="text-slate-400"
            />
            <DetailItem
                icon={Eye}
                label="Visibility"
                value={`${current.visibility} km`}
                colorClass="text-indigo-400"
            />
            <DetailItem
                icon={Sun}
                label="UV Index"
                value={current.uv_index}
                colorClass="text-yellow-400"
            />
        </div>
    );
};

export default WeatherDetails;
