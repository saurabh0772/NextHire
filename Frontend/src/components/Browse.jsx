import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// const randomJobs = [1, 2,45];

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
    }, []);

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
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8'>
                {/* Header Section */}
                <div className='text-center mb-10'>
                    <h1 className='text-4xl font-bold mb-4'>
                        <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                            Browse All Jobs
                        </span>
                    </h1>
                    <p className='text-slate-400'>
                        {filteredJobs.length} opportunities waiting for you
                    </p>
                </div>

                {/* Search Bar */}
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10'>
                        <Search className='h-5 w-5 text-blue-400' />
                        <input
                            type="text"
                            placeholder='Search by job title, company, or location...'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className='w-full bg-transparent outline-none text-white placeholder:text-slate-400'
                        />
                    </div>
                </div>

                {/* Job Grid */}
                {filteredJobs.length === 0 ? (
                    <div className='text-center py-12'>
                        <p className='text-slate-400 text-lg'>No jobs found matching your search criteria</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredJobs.map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
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