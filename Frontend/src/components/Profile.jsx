import React from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import AppliedJobTable from './AppliedJobTable';
import Navbar from './shared/Navbar';
import { User2, Mail, Phone, Briefcase } from 'lucide-react';
import { useSelector } from 'react-redux';

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Profile Card */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-brand-600 to-violet-600"></div>
                    
                    <div className="relative z-10 pt-12 text-center">
                        <div className="w-24 h-24 mx-auto rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-lg mb-4">
                            {user?.profile?.profilePhoto ? (
                                <img src={user?.profile?.profilePhoto} alt={user?.fullname} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="w-full h-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center text-3xl font-bold">
                                    {user?.fullname?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{user?.fullname}</h1>
                        <p className="text-slate-500 font-medium text-sm mb-6 capitalize">{user?.role}</p>
                        
                        <div className="flex justify-center mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Active Status
                            </span>
                        </div>

                        <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium truncate">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">{user?.phoneNumber || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <UpdateProfileDialog />
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full lg:w-2/3 space-y-8">
                {user?.role !== 'recruiter' && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <User2 className="text-brand-500" />
                            About Me
                        </h2>
                        {user?.profile?.bio ? (
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{user?.profile?.bio}</p>
                        ) : (
                            <p className="text-slate-400 italic">No bio provided.</p>
                        )}

                        <div className="mt-8">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Skills</h3>
                            {user?.profile?.skills?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user?.profile?.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 italic">No skills listed.</p>
                            )}
                        </div>

                        {user?.profile?.resume && (
                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Resume</h3>
                                <a 
                                    target="blank" 
                                    href={user?.profile?.resume} 
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/40 rounded-xl font-medium transition-colors"
                                >
                                    View Original Resume
                                </a>
                            </div>
                        )}
                    </div>
                )}

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Briefcase className="text-brand-500" />
                        {user?.role === 'recruiter' ? 'My Job Postings' : 'Applied Jobs'}
                    </h2>
                    <AppliedJobTable />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
