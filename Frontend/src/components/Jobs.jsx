import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Briefcase } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (searchedQuery || searchInput) {
            const query = searchedQuery || searchInput;
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(query.toLowerCase()) ||
                    job.description.toLowerCase().includes(query.toLowerCase()) ||
                    job.location.toLowerCase().includes(query.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery, searchInput]);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12'>
                {/* Header Section */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white mb-2'>
                        Search <span className='text-brand-600 dark:text-brand-400'>Jobs</span>
                    </h1>
                    <p className='text-slate-500 dark:text-slate-400 font-medium'>Find your perfect role from {allJobs.length} open positions</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Sidebar / Filters */}
                    <div className='w-full lg:w-1/4'>
                        {/* Search Bar Mobile/Desktop */}
                        <div className='mb-6'>
                            <div className='flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-brand-500 dark:focus-within:border-brand-500 transition-all'>
                                <Search className='h-5 w-5 text-slate-400' />
                                <input
                                    type="text"
                                    placeholder='Search jobs...'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className='w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 text-sm font-medium'
                                />
                            </div>
                        </div>
                        <FilterCard />
                    </div>
                    
                    {/* Job Grid */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800'>
                                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                                    <Briefcase className='h-8 w-8 text-slate-400' />
                                </div>
                                <h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>No jobs found</h3>
                                <p className='text-slate-500 dark:text-slate-400 max-w-md'>We couldn't find any jobs matching your current search criteria. Try adjusting your filters.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {filterJobs.map((job, index) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="h-full"
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs