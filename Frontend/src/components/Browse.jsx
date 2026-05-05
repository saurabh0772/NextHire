import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search, Briefcase } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    useEffect(() => {
        if (searchInput) {
            const filtered = allJobs.filter(job => 
                job.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.company.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.location.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [searchInput, allJobs]);

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950 pb-12'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8'>
                {/* Header Section */}
                <div className='text-center mb-10'>
                    <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white mb-2'>
                        Browse All <span className='text-brand-600 dark:text-brand-400'>Jobs</span>
                    </h1>
                    <p className='text-slate-500 dark:text-slate-400 font-medium'>
                        {filteredJobs.length} opportunities waiting for you
                    </p>
                </div>

                {/* Search Bar */}
                <div className='max-w-2xl mx-auto mb-16'>
                    <div className='flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none focus-within:border-brand-500 dark:focus-within:border-brand-500 transition-all'>
                        <Search className='h-6 w-6 text-brand-500 ml-2' />
                        <input
                            type="text"
                            placeholder='Search by job title, company, or location...'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className='w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 text-base font-medium h-10'
                        />
                    </div>
                </div>

                {/* Job Grid */}
                {filteredJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800'>
                        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-full mb-4">
                            <Briefcase className='h-10 w-10 text-slate-400' />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-900 dark:text-white mb-2'>No jobs found</h3>
                        <p className='text-slate-500 dark:text-slate-400 max-w-md'>We couldn't find any jobs matching your search criteria. Try a different keyword.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8'>
                        {filteredJobs.map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                                className="h-full"
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse