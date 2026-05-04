import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

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
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8'>
                {/* Header Section */}
                <div className='text-center mb-10'>
                    <h1 className='text-4xl font-bold mb-4'>
                        <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                            Available Jobs
                        </span>
                    </h1>
                    <p className='text-slate-400'>Find your perfect role from {allJobs.length} open positions</p>
                </div>

                {/* Search Bar */}
                <div className='max-w-2xl mx-auto mb-10'>
                    <div className='flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10'>
                        <Search className='h-5 w-5 text-blue-400' />
                        <input
                            type="text"
                            placeholder='Search jobs by title, description, or location...'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className='w-full bg-transparent outline-none text-white placeholder:text-slate-400'
                        />
                    </div>
                </div>

                <div className='flex gap-8'>
                    <div className='w-1/4'>
                        <FilterCard />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <div className='flex-1 flex items-center justify-center'>
                            <p className='text-slate-400 text-lg'>No jobs found matching your criteria</p>
                        </div>
                    ) : (
                        <div className='flex-1'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {filterJobs.map((job, index) => (
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Jobs