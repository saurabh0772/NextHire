import React, { useState } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [currentCategory, setCurrentCategory] = useState("Frontend Developer");
    const [page, setPage] = useState(1);
    const jobsPerPage = 6;

    const categories = [
        { name: "Frontend Developer", icon: "💻" },
        { name: "Backend Developer", icon: "⚙️" },
        { name: "Data Entry", icon: "📝" },
        { name: "Data Analyst", icon: "📊" },
        { name: "UI/UX Designer", icon: "🎨" },
        { name: "Digital Marketing", icon: "📱" }
    ];

    const filteredJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(currentCategory.toLowerCase())
    );

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const startIndex = (page - 1) * jobsPerPage;
    const displayedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className='relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-24'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-16'
                >
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 mb-4'>
                        <TrendingUp className='h-4 w-4 text-brand-600 dark:text-brand-400' />
                        <span className='text-brand-700 dark:text-brand-300 text-sm font-medium'>Latest Opportunities</span>
                    </div>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white'>
                        Top <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-500'>Job Openings</span>
                    </h1>
                </motion.div>

                {/* Category Navigation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='relative mb-12'
                >
                    <div className='flex items-center justify-center gap-3 overflow-x-auto py-4 scrollbar-hide pb-4'>
                        {categories.map((category, index) => (
                            <motion.button
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                onClick={() => {
                                    setCurrentCategory(category.name);
                                    setPage(1);
                                }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                    currentCategory === category.name
                                        ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-md'
                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                                }`}
                            >
                                <span>{category.icon}</span>
                                {category.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Job Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8'
                >
                    {displayedJobs.length <= 0 ? (
                        <motion.div 
                            variants={itemVariants}
                            className='col-span-full flex flex-col items-center justify-center gap-4 p-12 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700'
                        >
                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full">
                                <Briefcase className='h-8 w-8 text-slate-400' />
                            </div>
                            <p className='text-slate-500 font-medium text-lg'>No jobs available in this category</p>
                        </motion.div>
                    ) : (
                        displayedJobs.map((job) => (
                            <motion.div key={job._id} variants={itemVariants}>
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    )}
                </motion.div>

                {/* Pagination */}
                {filteredJobs.length > jobsPerPage && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='flex justify-center gap-2 mt-12'
                    >
                        <button 
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className={`p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 
                                ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-all shadow-sm'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className='flex items-center gap-2'>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300
                                        ${page === i + 1 
                                            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20' 
                                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className={`p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 
                                ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-all shadow-sm'}`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default LatestJobs