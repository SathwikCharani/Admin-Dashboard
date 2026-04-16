import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Store, User, Phone, Mail, MapPin, Navigation, Info, ArrowLeft, Globe, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/super-admin/ThemeContext';
import Button from '@/components/super-admin/ui/Button';
import { superAdminService } from "@/services/super-admin/superAdminService";

const StoreDetail = () => {
  const { isDark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const data = await superAdminService.getStoreById(id);
        if (!data) throw new Error('Store not found');
        setStore(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching store:', err);
        setError('Store not found or failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 size={48} className="animate-spin text-[#1d5ba0] mb-4" />
        <p className="font-medium">Retrieving store profile...</p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center">
        <Info size={48} className="mb-4 text-rose-500" />
        <p className="text-lg font-bold">{error || 'Store Not Found'}</p>
        <Button onClick={() => navigate('/store-list')} className="mt-4">Back to List</Button>
      </div>
    );
  }

  const cardClasses = `p-5 rounded-xl border transition-all duration-200 shadow-md hover:shadow-lg ${
    isDark ? 'bg-[#2c3136] border-slate-700' : 'bg-white border-gray-200'
  }`;

  const labelClasses = "text-gray-500 text-sm font-medium uppercase tracking-wider";
  const valueClasses = `text-md font-medium ${isDark ? 'text-slate-200' : 'text-gray-800'}`;
  const iconBgClasses = `w-10 h-10 rounded-xl flex items-center justify-center ${
    isDark ? 'bg-slate-700 text-slate-300' : 'bg-[#1d5ba0]/10 text-[#1d5ba0]'
  }`;

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/store-list')}
            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>{store.name}</h2>
            <p className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Detailed retail store profile.</p>
          </div>
        </div>
        
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
          store.status === 'Active' 
            ? (isDark ? 'bg-emerald-500 text-white' : 'bg-[#1d5ba0] text-white')
            : (isDark ? 'bg-rose-500 text-white' : 'bg-white text-[#1d5ba0] border border-[#1d5ba0]')
        }`}>
          {store.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Store Info Card */}
        <div className="md:col-span-2 space-y-6">
          <div className={cardClasses}>
            <div className="flex items-center gap-3 mb-8">
              <div className={iconBgClasses}>
                <Store size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>General Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                <span className={labelClasses}>Store Name</span>
                <p className={valueClasses}>{store.name}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className={labelClasses}>Owner Name</span>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-[#1d5ba0]" />
                  <p className={valueClasses}>{store.owner_name}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={labelClasses}>Contact Number</span>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#1d5ba0]" />
                  <p className={valueClasses}>{store.mobile_number}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={labelClasses}>Email Address</span>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#1d5ba0]" />
                  <p className={`${valueClasses} truncate`}>{store.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={cardClasses}>
            <div className="flex items-center gap-3 mb-4">
              <div className={iconBgClasses}>
                <MapPin size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>Store Address</h3>
            </div>
            <p className={`text-md font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{store.address}</p>
          </div>
        </div>

        {/* Geo Location Card */}
        <div className={`${cardClasses} h-fit`}>
          <div className="flex items-center gap-3 mb-8">
            <div className={iconBgClasses}>
              <Navigation size={20} />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>Geo Tracking</h3>
          </div>

          <div className="space-y-4">
            <div className={`p-3 rounded-lg border transition-all ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-[#1d5ba0]'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Latitude</span>
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>{store.latitude}</p>
            </div>

            <div className={`p-3 rounded-lg border transition-all ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-[#1d5ba0]'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Longitude</span>
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>{store.longitude}</p>
            </div>
          </div>
          
          <button className={`w-full mt-6 py-2.5 rounded-md text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
            isDark 
              ? 'bg-brand/20 text-brand border border-brand/20 hover:bg-brand hover:text-white' 
              : 'bg-[#1d5ba0] text-white hover:bg-white hover:text-[#1d5ba0] border border-[#1d5ba0]'
          }`}>
            <Globe size={16} />
            Check Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
