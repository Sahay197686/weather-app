import { useState, useEffect } from 'react'
import { Cloud, Search, MapPin, Wind, Droplets, Thermometer, Info, Waves, Calendar, Loader2, AlertCircle } from 'lucide-react'
import { useWeather } from './hooks/useWeather'
import WeatherDetails from './components/WeatherDetails'
import GlassCard from './components/GlassCard'
import { twMerge } from 'tailwind-merge'

function App() {
    const [searchInput, setSearchInput] = useState('')
    const { loading, error, weatherData, view, setView, fetchWeather } = useWeather();

    useEffect(() => {
        fetchWeather('New York'); // Initial search
    }, [fetchWeather]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            fetchWeather(searchInput, view);
        }
    };

    const current = weatherData?.current;
    const location = weatherData?.location;

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative">
            {/* Dynamic Background */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/30 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/30 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="w-full max-w-7xl h-[90vh] glass-morphism rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 border border-white/20">

                {/* Sidebar */}
                <aside className="w-full md:w-80 glass-morphism-dark p-8 flex flex-col gap-10 border-r border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
                            <Cloud className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-white leading-none">SKYGLASS</h1>
                            <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] mt-1 uppercase">Premium SaaS</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                        {[
                            { id: 'current', label: 'Dashboard', icon: MapPin },
                            { id: 'forecast', label: 'Predictive', icon: Calendar },
                            { id: 'historical', label: 'Archival', icon: Info },
                            { id: 'marine', label: 'Maritime', icon: Waves },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={twMerge(
                                    "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold group",
                                    view === item.id
                                        ? "bg-white/10 text-white shadow-inner border border-white/10"
                                        : "text-white/40 hover:bg-white/5 hover:text-white/70"
                                )}
                            >
                                <item.icon size={20} className={view === item.id ? "text-blue-400" : "group-hover:text-blue-300"} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-white/10 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                            <Thermometer size={18} className="text-white" />
                        </div>
                        <p className="text-xs text-blue-300 font-black uppercase tracking-widest mb-2">Enterprise Plan</p>
                        <p className="text-sm text-white/70 leading-relaxed font-medium">Unlock precise historical data and maritime forecasts.</p>
                        <button className="mt-5 w-full py-3 bg-white text-indigo-950 text-xs font-black rounded-xl hover:bg-blue-50 transition-all hover:shadow-lg active:scale-95 uppercase tracking-wider">Upgrade</button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col p-8 md:p-12 gap-10 overflow-y-auto no-scrollbar">
                    {/* Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <form onSubmit={handleSearch} className="relative w-full lg:max-w-md group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search location (e.g. London, London, UK)..."
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-white font-medium placeholder:text-white/20"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </form>

                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-white font-bold text-lg">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Live Distribution</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 p-1 bg-white/5 flex items-center justify-center">
                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${location?.name || 'User'}`} alt="User" className="rounded-xl" />
                            </div>
                        </div>
                    </header>

                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-blue-400" size={48} />
                            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Syncing with satellites...</p>
                        </div>
                    ) : error ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-10 glass-morphism rounded-[2rem] border-red-500/20">
                            <AlertCircle className="text-red-400" size={64} />
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">Access Restricted</h3>
                                <p className="text-white/40 max-w-md mx-auto">{error}</p>
                                <button
                                    onClick={() => fetchWeather('New York')}
                                    className="mt-8 px-8 py-3 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition-all"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    ) : weatherData ? (
                        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Dynamic View Header */}
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-1.5 bg-blue-500 rounded-full"></div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                                    {view} Analysis
                                </h2>
                            </div>

                            {/* Main Display Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                                {/* Hero Section */}
                                <div className="xl:col-span-2 relative">
                                    <GlassCard className="p-10 h-96 flex flex-col justify-between overflow-hidden relative group">
                                        <div className="flex justify-between items-start z-10">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <MapPin size={16} className="text-blue-400" />
                                                    <span className="text-blue-400 font-black text-xs uppercase tracking-widest">Target Node</span>
                                                </div>
                                                <h3 className="text-6xl font-black text-white tracking-tighter">
                                                    {location?.name}
                                                </h3>
                                                <p className="text-white/40 text-lg font-medium mt-1">
                                                    {location?.region}, {location?.country}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                                                    {current?.temperature}<span className="text-blue-500 text-4xl">°</span>
                                                </div>
                                                <p className="text-white/60 font-bold uppercase tracking-widest text-sm mt-2">
                                                    {current?.weather_descriptions?.[0]}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-10 z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                                    <Wind className="text-blue-400" size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Velocity</p>
                                                    <p className="text-xl font-bold">{current?.wind_speed} <span className="text-xs text-white/40 uppercase">km/h</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                                    <Droplets className="text-indigo-400" size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Density</p>
                                                    <p className="text-xl font-bold">{current?.humidity}<span className="text-xs text-white/40">%</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SVG Weather Graphic Overlay */}
                                        <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none animate-float">
                                            <Cloud size={400} />
                                        </div>
                                    </GlassCard>
                                </div>

                                {/* Sub Metrics Grid */}
                                <div className="flex flex-col gap-4">
                                    <WeatherDetails current={current} />
                                </div>
                            </div>

                            {/* Auxiliary Data View (Forecast/Historical placeholders) */}
                            <div className="p-8 rounded-[2rem] bg-black/20 border border-white/5 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-white/60 font-black uppercase tracking-widest text-xs">Ancillary Data Feed</h4>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] text-green-500 font-bold uppercase">Connected</span>
                                    </div>
                                </div>

                                {view !== 'current' ? (
                                    <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
                                        <AlertCircle className="text-yellow-500/50" size={40} />
                                        <div>
                                            <h5 className="text-white font-bold">Standard Endpoint Restricted</h5>
                                            <p className="text-white/30 text-sm max-w-xs mt-2 italic">The Weatherstack standard plan may restrict direct access to "{view}" telemetry. Use Current view for high-fidelity data.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {['Visibility', 'Pressure', 'Precip', 'UV'].map((label, idx) => (
                                            <div key={label} className="flex flex-col gap-1">
                                                <span className="text-white/20 text-[10px] font-bold uppercase tracking-wider">{label}</span>
                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500/40 rounded-full" style={{ width: `${(idx + 1) * 20}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-white/20 font-bold uppercase tracking-[0.4em]">Initialize Portal</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default App
