import React, { useState } from 'react';
import { Calendar, Search, History, Thermometer, Wind, Droplets } from 'lucide-react';
import GlassCard from './GlassCard';

const HistoricalView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="flex-1 space-y-2">
                    <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] ml-2">Temporal Node Selection</label>
                    <div className="relative">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                        <input
                            type="date"
                            className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-white font-medium"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>
                <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 uppercase tracking-widest text-xs">
                    Retrieve Archives
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
                <GlassCard className="p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Thermometer className="text-amber-400" size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Avg Temp</p>
                        <p className="text-2xl font-black text-white">--°</p>
                    </div>
                </GlassCard>
                <GlassCard className="p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Wind className="text-cyan-400" size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Max Wind</p>
                        <p className="text-2xl font-black text-white">-- km/h</p>
                    </div>
                </GlassCard>
                <GlassCard className="p-8 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Droplets className="text-blue-400" size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Total Prec</p>
                        <p className="text-2xl font-black text-white">-- mm</p>
                    </div>
                </GlassCard>
            </div>

            <div className="p-10 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4 py-20">
                <History className="text-white/10" size={64} />
                <p className="text-white/20 font-bold uppercase tracking-widest text-sm">Select a date to unlock historical telemetry records</p>
            </div>
        </div>
    );
};

export default HistoricalView;
