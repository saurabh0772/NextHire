import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  BarChart2, Users, Briefcase, TrendingUp, Award, 
  CheckCircle, XCircle, Clock, ArrowLeft, Loader2 
} from 'lucide-react';
import { toast } from 'sonner';
import { ANALYTICS_API_END_POINT } from '../../utils/constant';
import Navbar from '../shared/Navbar';

const RecruiterAnalytics = () => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (user?.role !== 'recruiter') {
      navigate('/');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${ANALYTICS_API_END_POINT}/recruiter`, {
          withCredentials: true
        });
        if (res.data.success) {
          setAnalytics(res.data.analytics);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, navigate]);

  if (!user || user.role !== 'recruiter') return null;

  const DONUT_COLORS = {
    pending: '#f59e0b',
    accepted: '#10b981', 
    rejected: '#ef4444'
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-purple-600">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Loading Analytics...</p>
          </div>
        ) : !analytics || analytics.totalJobs === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-12 shadow-sm border border-slate-100 mt-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BarChart2 className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Analytics Yet</h2>
            <p className="text-slate-500 mb-6">Post your first job to start seeing analytics on your applicants and job performance.</p>
            <Link to="/recruiter/jobs/create" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
              Post a Job
            </Link>
          </div>
        ) : (
          <>
            {/* SECTION 1 — Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Recruiter Analytics</h1>
                  <p className="text-slate-500">Insights for your job postings</p>
                </div>
              </div>
              <div className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* SECTION 2 — Overview Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 font-medium">Total Jobs Posted</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800">{analytics.totalJobs}</h3>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 font-medium">Total Applications</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800">{analytics.totalApplications}</h3>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 font-medium">Accepted</span>
                </div>
                <h3 className="text-3xl font-bold text-green-600">{analytics.totalAccepted}</h3>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 font-medium">Pending Review</span>
                </div>
                <h3 className="text-3xl font-bold text-yellow-600">{analytics.totalPending}</h3>
              </div>
            </div>

            {/* SECTION 3 — Top Performing Job Banner */}
            {analytics.topPerformingJob && (
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 mb-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-purple-100 font-medium mb-1 text-sm uppercase tracking-wider">Top Performing Job</div>
                    <h2 className="text-xl font-bold">{analytics.topPerformingJob.title}</h2>
                    <p className="text-purple-100">{analytics.topPerformingJob.company} • {analytics.topPerformingJob.totalApplications} applications</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{analytics.topPerformingJob.acceptanceRate}</div>
                  <div className="text-purple-100 text-sm">acceptance rate</div>
                </div>
              </div>
            )}

            {/* SECTION 4 — Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* CHART A — Applications by Job */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold text-lg">
                  <BarChart2 className="w-5 h-5 text-purple-500" />
                  Applications by Job
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.applicationsByJob} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="jobTitle" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} height={80} interval={0} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} cursor={{fill: 'transparent'}} />
                    <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                    <Bar dataKey="total" name="Total" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="accepted" name="Accepted" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* CHART B — Application Status */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-slate-800 font-semibold text-lg">
                  <Users className="w-5 h-5 text-purple-500" />
                  Application Status Breakdown
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie 
                        data={[
                          { name: 'Pending', value: analytics.statusBreakdown.pending, color: DONUT_COLORS.pending },
                          { name: 'Accepted', value: analytics.statusBreakdown.accepted, color: DONUT_COLORS.accepted },
                          { name: 'Rejected', value: analytics.statusBreakdown.rejected, color: DONUT_COLORS.rejected }
                        ].filter(item => item.value > 0)} 
                        cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value" stroke="none"
                      >
                        {
                          [
                            { name: 'Pending', value: analytics.statusBreakdown.pending, color: DONUT_COLORS.pending },
                            { name: 'Accepted', value: analytics.statusBreakdown.accepted, color: DONUT_COLORS.accepted },
                            { name: 'Rejected', value: analytics.statusBreakdown.rejected, color: DONUT_COLORS.rejected }
                          ].filter(item => item.value > 0).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))
                        }
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }}
                        formatter={(value, name) => [`${value} applications`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: DONUT_COLORS.pending }}></div>
                      <span className="text-sm text-slate-600">Pending</span>
                      <span className="font-bold text-slate-800">{analytics.statusBreakdown.pending}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: DONUT_COLORS.accepted }}></div>
                      <span className="text-sm text-slate-600">Accepted</span>
                      <span className="font-bold text-slate-800">{analytics.statusBreakdown.accepted}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: DONUT_COLORS.rejected }}></div>
                      <span className="text-sm text-slate-600">Rejected</span>
                      <span className="font-bold text-slate-800">{analytics.statusBreakdown.rejected}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 5 — Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* CHART C — Top Skills */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    Top Skills Among Applicants
                  </div>
                  <p className="text-sm text-slate-500 ml-7">Based on applicant profiles</p>
                </div>
                
                {analytics.skillsFrequency.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                    <Users className="w-10 h-10 mb-2 opacity-50" />
                    <p>Not enough skill data yet</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={analytics.skillsFrequency} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                      <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="skill" tick={{ fontSize: 12, fill: '#475569' }} width={80} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }}
                        formatter={(value) => [`${value} applicants`, 'Count']}
                        cursor={{fill: '#f8fafc'}}
                      />
                      <Bar dataKey="count" name="Applicants" radius={[0, 4, 4, 0]} barSize={16}>
                        {analytics.skillsFrequency.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${262 - index * 8}, 70%, ${55 + index * 3}%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* CHART D — Application Trend */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold text-lg">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Application Trend Over Time
                </div>
                
                {analytics.applicationTrend.length === 0 ? (
                  <div className="h-[320px] flex flex-col items-center justify-center text-slate-400">
                    <TrendingUp className="w-10 h-10 mb-2 opacity-50" />
                    <p className="font-medium text-slate-500">Not enough data yet</p>
                    <p className="text-sm">Trend will appear as applications come in</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={analytics.applicationTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Applications"
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* SECTION 6 — Jobs Performance Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-slate-800 text-lg">All Jobs Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-medium">Job Title</th>
                      <th className="px-6 py-4 font-medium">Company</th>
                      <th className="px-6 py-4 font-medium">Total</th>
                      <th className="px-6 py-4 font-medium">Accepted</th>
                      <th className="px-6 py-4 font-medium">Pending</th>
                      <th className="px-6 py-4 font-medium">Rejected</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.applicationsByJob.map((job, index) => {
                      let badge = null;
                      if (job.total === 0) {
                        badge = <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">No Applications</span>;
                      } else if (job.accepted / job.total >= 0.5) {
                        badge = <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">High Converting</span>;
                      } else if (job.total >= 5) {
                        badge = <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Popular</span>;
                      } else {
                        badge = <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Active</span>;
                      }

                      return (
                        <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors last:border-none">
                          <td className="px-6 py-4 font-medium text-slate-800">{job.jobTitle}</td>
                          <td className="px-6 py-4 text-slate-500">{job.company}</td>
                          <td className="px-6 py-4 font-bold text-purple-600">{job.total}</td>
                          <td className="px-6 py-4 font-medium text-green-600">{job.accepted}</td>
                          <td className="px-6 py-4 font-medium text-yellow-600">{job.pending}</td>
                          <td className="px-6 py-4 font-medium text-red-500">{job.rejected}</td>
                          <td className="px-6 py-4">{badge}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecruiterAnalytics;
