import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Briefcase } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery, filterQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        let filtered = [...allJobs];

        // 1. Text Search (Home Page Category or local Search Bar)
        const textQuery = searchedQuery || searchInput;
        if (textQuery) {
            const queryStr = textQuery.toLowerCase();
            filtered = filtered.filter((job) => {
                return job.title.toLowerCase().includes(queryStr) ||
                    job.description.toLowerCase().includes(queryStr) ||
                    job.location.toLowerCase().includes(queryStr) ||
                    job.company?.name?.toLowerCase().includes(queryStr);
            });
        }

        // 2. FilterCard Location
        if (filterQuery?.location) {
            filtered = filtered.filter(job => job.location.toLowerCase().includes(filterQuery.location.toLowerCase()));
        }

        // 3. FilterCard Industry (matches title or description since there isn't an explicit 'industry' field)
        if (filterQuery?.industry) {
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(filterQuery.industry.toLowerCase()) || 
                job.description.toLowerCase().includes(filterQuery.industry.toLowerCase())
            );
        }

        // 4. FilterCard Salary
        if (filterQuery?.salary) {
            const salaryStr = filterQuery.salary;
            filtered = filtered.filter(job => {
                // If it's a predefined range like "10-15 LPA"
                if (salaryStr.includes("LPA")) {
                    const parsed = salaryStr.split(" ")[0]; // "3-5" or "20+"
                    if (parsed.includes("-")) {
                        const [min, max] = parsed.split("-").map(Number);
                        return job.salary >= min && job.salary <= max;
                    } else if (parsed.includes("+")) {
                        const min = Number(parsed.replace("+", ""));
                        return job.salary >= min;
                    }
                } 
                // Manual number input like "15" or text
                else {
                    const num = Number(salaryStr.replace(/[^0-9]/g, ''));
                    if (!isNaN(num) && num > 0) {
                        return job.salary >= num;
                    }
                    return true;
                }
                return true;
            });
        }

        setFilterJobs(filtered);
    }, [allJobs, searchedQuery, searchInput, filterQuery]);

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