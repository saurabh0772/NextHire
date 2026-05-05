import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, BriefcaseIcon, LayoutDashboard, Plus, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 p-4 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                        <LayoutDashboard className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        Recruiter Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
                        Welcome back! Manage your active job postings, review applicants, and update your company profiles.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Post New Job */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800">
                        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                            <BriefcaseIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Manage Jobs</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 flex-grow">
                            Create new job listings, view active postings, and track applications.
                        </p>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Link to="/recruiter/jobs/create" className="w-full">
                                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
                                    <Plus className="h-4 w-4 mr-1.5" />
                                    Post Job
                                </Button>
                            </Link>
                            <Link to="/recruiter/jobs" className="w-full">
                                <Button variant="outline" className="w-full h-12 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl">
                                    <Eye className="h-4 w-4 mr-1.5" />
                                    View Jobs
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Manage Company */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800">
                        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
                            <Building2 className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Manage Companies</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 flex-grow">
                            Register new companies and update branding for your organizations.
                        </p>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Link to="/recruiter/companies/create" className="w-full">
                                <Button className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all">
                                    <Plus className="h-4 w-4 mr-1.5" />
                                    Register
                                </Button>
                            </Link>
                            <Link to="/recruiter/companies" className="w-full">
                                <Button variant="outline" className="w-full h-12 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl">
                                    <Eye className="h-4 w-4 mr-1.5" />
                                    View Profiles
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;