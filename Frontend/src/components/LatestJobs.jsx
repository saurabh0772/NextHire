import React, { useState } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

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
        <div className='relative overflow-hidden'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
                <div className='absolute inset-0'>
                    <div className='absolute top-0 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl'></div>
                    <div className='absolute bottom-0 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl'></div>
                </div>
            </div>

            <div className='relative py-20'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-center mb-12'
                    >
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-4'>
                            <TrendingUp className='h-4 w-4 text-blue-400' />
                            <span className='text-slate-300 text-sm'>Latest Opportunities</span>
                        </div>
                        <h1 className='text-4xl font-bold'>
                            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                                Latest & Top
                            </span>
                            <span className='text-white'> Job Openings</span>
                        </h1>
                    </motion.div>

                    {/* Category Navigation */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='relative mb-12'
                    >
                        <div className='flex items-center justify-center gap-4 overflow-x-auto py-4 scrollbar-hide'>
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    onClick={() => setCurrentCategory(category.name)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                                        currentCategory === category.name
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:scale-105'
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
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    >
                        {displayedJobs.length <= 0 ? (
                            <motion.div 
                                variants={itemVariants}
                                className='col-span-full flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'
                            >
                                <Briefcase className='h-12 w-12 text-slate-400' />
                                <p className='text-slate-300 text-lg'>No jobs available in this category</p>
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
                            className='flex justify-center gap-4 mt-12'
                        >
                            <button 
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className={`p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-300 
                                    ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:scale-105'} 
                                    transition-all duration-300`}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className='flex items-center gap-2 text-slate-300'>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300
                                            ${page === i + 1 
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30' 
                                                : 'bg-white/5 hover:bg-white/10'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className={`p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-300 
                                    ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:scale-105'} 
                                    transition-all duration-300`}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LatestJobs