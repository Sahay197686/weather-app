import React from 'react';
import { Waves, Wind, Thermometer, Anchor, Navigation, Compass } from 'lucide-react';
import GlassCard from './GlassCard';

const MarineMetric = ({ icon: Icon, label, value, subtext, colorClass }) => (
    <GlassCard className="p-8 flex flex-col justify-between h-48 group">
        <div className={`p-4 w-fit rounded-2xl ${colorClass.bg} ${colorClass.border} border transition-transform group-hover:scale-110`}>
            <Icon className={colorClass.text} size={28} />
        </div>
        <div>
            <p className="text-xs text-white/40 font-black uppercase tracking-widest">{label}</p>
            <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase">{subtext}</p>
            </div>
        </div>
    </GlassCard>
);

const MarineView = () => {
    return (
        <div className="flex flex-col gap-10 animate-in fade-in zoom-in-95 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MarineMetric
                    icon={Waves}
                    label="Swell Height"
                    value="1.2"
                    subtext="Meters"
                    colorClass={{ bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' }}
                />
                <MarineMetric
                    icon={Compass}
                    label="Swell Direction"
                    value="240"
                    subtext="Degrees"
                    colorClass={{ bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' }}
                />
                <MarineMetric
                    icon={Anchor}
                    label="Marine Pressure"
                    value="1013"
                    subtext="hPa"
                    colorClass={{ bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' }}
                />
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                        <Navigation className="text-blue-400" size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-white">Maritime Safety Alert</h4>
                        <p className="text-white/40 text-sm mt-1">Swell conditions are favorable for medium-sized vessels within the exclusion zone.</p>
                    </div>
                </div>
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">View Coastal Map</button>
            </div>
        </div>
    );
};

export default MarineView;
