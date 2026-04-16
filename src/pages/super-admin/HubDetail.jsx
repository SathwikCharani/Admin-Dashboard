import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Warehouse, MapPin, Navigation, Info, ArrowLeft, Globe, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/super-admin/ThemeContext';
import Button from '@/components/super-admin/ui/Button';
import { superAdminService } from "@/services/super-admin/superAdminService";

const HubDetail = () => {
  const { isDark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [hub, setHub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHub = async () => {
      try {
        setLoading(true);
        const data = await superAdminService.getHubById(id);
        if (!data) throw new Error('Hub not found');
        setHub(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hub:', err);
        setError('Hub not found or failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHub();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 size={48} className="animate-spin text-[#1d5ba0] mb-4" />
        <p className="font-medium">Retrieving hub details...</p>
      </div>
    );
  }

  if (error || !hub) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center">
        <Info size={48} className="mb-4 text-rose-500" />
        <p className="text-lg font-bold">{error || 'Hub Not Found'}</p>
        <Button onClick={() => navigate('/hub-list')} className="mt-4">Back to List</Button>
      </div>
    );
  }

  const iconBgClasses = `w-10 h-10 rounded-xl flex items-center justify-center ${
    isDark ? 'bg-slate-700 text-slate-300' : 'bg-[#1d5ba0]/10 text-[#1d5ba0]'
  }`;

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/hub-list')}
            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>{hub.name}</h2>
            <p className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Detailed hub information and location.</p>
          </div>
        </div>
        
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
          hub.status === 'Active' 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
            : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
        }`}>
          {hub.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className={`md:col-span-2 p-8 rounded-3xl border transition-all ${isDark ? 'bg-[#2c3136] border-slate-700 shadow-xl' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className={iconBgClasses}>
              <Info size={20} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>Hub Information</h3>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Name</span>
              <p className={`text-lg font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{hub.name}</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Location Address</span>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-[#1d5ba0] shrink-0 mt-0.5" />
                <p className={`text-md font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{hub.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinates Card */}
        <div className={`p-8 rounded-3xl border transition-all ${isDark ? 'bg-[#2c3136] border-slate-700 shadow-xl' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className={iconBgClasses}>
              <Navigation size={20} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>Geo Location</h3>
          </div>

          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-[#1d5ba0]'}`}>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Latitude</span>
              <p className={`text-xl font-black ${isDark ? 'text-[#1d5ba0]' : 'text-[#1d5ba0]'}`}>{hub.latitude}</p>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-[#1d5ba0]'}`}>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Longitude</span>
              <p className={`text-xl font-black ${isDark ? 'text-[#1d5ba0]' : 'text-[#1d5ba0]'}`}>{hub.longitude}</p>
            </div>
          </div>
          
          <button className={`w-full mt-6 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            isDark ? 'border-slate-700 hover:bg-slate-700 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
          }`}>
            <Globe size={14} />
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default HubDetail;
