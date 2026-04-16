import React, { useState, useEffect } from 'react';
import { Warehouse, MapPin, Eye, Search, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/super-admin/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { superAdminService } from "@/services/super-admin/superAdminService";

const HubList = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [hubs, setHubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        setLoading(true);
        const data = await superAdminService.getHubs();
        setHubs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hubs:', err);
        setError('Failed to load hubs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHubs();
  }, []);

  const filteredHubs = hubs.filter(hub => 
    hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hub.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1d5ba0]'}`}>Hub's List</h2>
          <p className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Manage and view all registered hubs.</p>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Search hubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all w-full md:w-64 ${
              isDark ? 'bg-[#1a1d21] border-slate-700 focus:ring-blue-500/20 text-white' : 'bg-white border-gray-200 focus:ring-[#1d5ba0]/20'
            }`}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 size={40} className="animate-spin text-[#1d5ba0] mb-4" />
          <p className="font-medium">Loading hubs architecture...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-rose-500">
          <p className="font-bold">{error}</p>
        </div>
      ) : (
        <div className={`rounded-xl overflow-hidden transition-all ${isDark ? 'bg-[#2c3136] border border-slate-700 shadow-xl' : 'bg-white shadow-md p-4'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-[#1d5ba0] text-white'} text-xs font-bold uppercase tracking-wider`}>
                  <th className="px-6 py-4 rounded-tl-lg">S.No</th>
                  <th className="px-6 py-4">Hub Name</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-700/50' : 'divide-gray-100'}`}>
                {filteredHubs.map((hub, index) => (
                  <tr key={hub.id} className={`group transition-all duration-200 ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-[#1d5ba0]/10'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-[#1d5ba0]/10 text-[#1d5ba0]'}`}>
                          <Warehouse size={16} />
                        </div>
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{hub.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate max-w-[200px]">{hub.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        hub.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {hub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/hub/${hub.id}`)}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                          isDark 
                            ? 'bg-brand/20 text-brand hover:bg-brand hover:text-white' 
                            : 'bg-[#1d5ba0] text-white hover:bg-white hover:text-[#1d5ba0] border border-[#1d5ba0]'
                        }`}
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredHubs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic text-sm">No hubs found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubList;
