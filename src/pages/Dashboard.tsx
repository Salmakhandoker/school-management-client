import React, { useEffect, useState } from 'react';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, GraduationCap, Award, Calendar, RefreshCcw } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load stats', err);
        setLoading(false);
      });
  };

  const defaultSubjectData = [
    { name: 'Mathematics', averageScore: 84 },
    { name: 'Science', averageScore: 89 },
    { name: 'Arts & Lit', averageScore: 92 },
    { name: 'Technology', averageScore: 95 },
    { name: 'Social Studies', averageScore: 87 }
  ];

  const defaultEnrollmentData = [
    { month: 'Sep', activeStudents: 310 },
    { month: 'Oct', activeStudents: 325 },
    { month: 'Nov', activeStudents: 330 },
    { month: 'Dec', activeStudents: 330 },
    { month: 'Jan', activeStudents: 360 },
    { month: 'Feb', activeStudents: 375 },
    { month: 'Mar', activeStudents: 382 }
  ];

  const subjectData = stats?.subjectPerformance || defaultSubjectData;
  const enrollmentData = stats?.enrollmentTrends || defaultEnrollmentData;
  const overviewStats = stats?.overview || {
    totalStudents: 382,
    totalTeachers: 24,
    totalClasses: 8,
    graduationRate: 98.4
  };

  if (loading) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-16 space-y-6">
        <div class="skeleton-shimmer h-12 w-1/4 rounded"></div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="skeleton-shimmer h-28 rounded-2xl"></div>
          <div class="skeleton-shimmer h-28 rounded-2xl"></div>
          <div class="skeleton-shimmer h-28 rounded-2xl"></div>
          <div class="skeleton-shimmer h-28 rounded-2xl"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="skeleton-shimmer h-80 rounded-3xl"></div>
          <div class="skeleton-shimmer h-80 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Academic Analytics Console</h1>
          <p class="text-xs text-slate-500">Welcome back, <strong class="text-slate-700">{user?.name}</strong>. Role: <span class="bg-indigo-50 text-primary border border-indigo-100 px-2 py-0.5 rounded-md font-bold uppercase text-[10px]">{user?.role}</span></p>
        </div>
        <button
          onClick={fetchStats}
          class="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
        >
          <RefreshCcw class="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-primary/10 text-primary rounded-xl">
            <Users class="w-6 h-6" />
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400">Total Enrolled</span>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{overviewStats.totalStudents}</h3>
          </div>
        </div>

        <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-cyan-50 text-secondary rounded-xl">
            <GraduationCap class="w-6 h-6" />
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400">Faculty Staff</span>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{overviewStats.totalTeachers}</h3>
          </div>
        </div>

        <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-emerald-50 text-accent rounded-xl">
            <Award class="w-6 h-6" />
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400">Course count</span>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{overviewStats.totalClasses}</h3>
          </div>
        </div>

        <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <Calendar class="w-6 h-6" />
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400">Graduation %</span>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{overviewStats.graduationRate}%</h3>
          </div>
        </div>

      </div>

      {/* Recharts Analytics Graphs Grid */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Course performance averages */}
        <div class="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
          <div>
            <h3 class="font-bold text-slate-950 text-sm md:text-base">Subject Performance Metrics</h3>
            <p class="text-[11px] text-slate-400">Average test scores recorded in various fields.</p>
          </div>
          <div class="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <YAxis stroke="#94a3b8" domain={[50, 100]} style={{ fontSize: '10px' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="averageScore" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Avg Score (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment progress timeline */}
        <div class="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
          <div>
            <h3 class="font-bold text-slate-950 text-sm md:text-base">Admissions Progression Timeline</h3>
            <p class="text-[11px] text-slate-400">Monthly progression of active student registrations.</p>
          </div>
          <div class="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDashStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '10px' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="activeStudents" stroke="#06B6D4" fillOpacity={1} fill="url(#colorDashStudents)" strokeWidth={2.5} name="Enrolled Roster" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
