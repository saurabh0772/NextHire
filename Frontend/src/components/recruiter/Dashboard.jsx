import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, BriefcaseIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Recruiter Dashboard
                        </span>
                    </h1>
                    <p className="text-slate-400">Manage your job postings and company profiles</p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Post New Job */}
                    <Link to="/recruiter/jobs/create" className="group">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex flex-col items-center text-center">
                            <BriefcaseIcon className="h-12 w-12 text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Post New Job</h3>
                            <p className="text-slate-400 mb-4">Create a new job listing and find the perfect candidate</p>
                            <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500">
                                Create Job
                            </Button>
                        </div>
                    </Link>

                    {/* Manage Company */}
                    <Link to="/recruiter/companies" className="group">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex flex-col items-center text-center">
                            <Building2 className="h-12 w-12 text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Manage Company</h3>
                            <p className="text-slate-400 mb-4">Update your company profile and information</p>
                            <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500">
                                View Companies
                            </Button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 