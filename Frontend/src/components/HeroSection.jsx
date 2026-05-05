import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, MapPin, Briefcase, Star, Users, ChevronRight, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '../assets/hero-illustration.svg';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const stats = [
        { count: "10k+", label: "Live Jobs", icon: <Briefcase className="h-6 w-6" /> },
        { count: "500+", label: "Companies", icon: <Star className="h-6 w-6" /> },
        { count: "250k+", label: "Job Seekers", icon: <Users className="h-6 w-6" /> },
    ];

    const popularSearches = [
        { tag: 'UI/UX Designer', delay: 0 },
        { tag: 'Programming', delay: 0.1 },
        { tag: 'Digital Marketing', delay: 0.2 },
        { tag: 'Video Animation', delay: 0.3 },
    ];

    const features = [
        { text: "AI-Powered Job Matching" },
        { text: "Verified Companies" },
        { text: "Instant Applications" },
    ];

    return (
        <div className='relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-24 pb-20 lg:pt-32 lg:pb-28'>
            {/* Animated background elements */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none'>
                <div className='absolute inset-0 bg-gradient-to-r from-brand-300 to-violet-300 dark:from-brand-600 dark:to-violet-600 rounded-full blur-3xl animate-pulse' style={{ animationDuration: '8s' }} />
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-16'>
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='flex-1 max-w-2xl'
                    >
                        <div className='space-y-8'>
                            <motion.div 
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-brand-600 dark:text-brand-400 font-medium text-sm'
                            >
                                <Sparkles className='h-4 w-4' />
                                <span>Trusted by 500+ Top Tech Companies</span>
                            </motion.div>
                            
                            <div className='space-y-6'>
                                <motion.h1 
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]'
                                >
                                    Find Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-500 animate-gradient'>Dream Job</span><br />
                                    <span className="text-4xl md:text-5xl lg:text-6xl">Faster & Smarter</span>
                                </motion.h1>
                                
                                <motion.p 
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className='text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl'
                                >
                                    Your gateway to endless career opportunities. Connect with industry-leading companies and take the next step in your professional journey.
                                </motion.p>

                                {/* Features List */}
                                <motion.div 
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-wrap gap-4 pt-2"
                                >
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                            <div className='p-1 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400'>
                                                <ChevronRight className='h-3 w-3' strokeWidth={3} />
                                            </div>
                                            {feature.text}
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className='flex flex-col md:flex-row gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-brand-500/5 border border-slate-200 dark:border-slate-800'
                            >
                                <div className='flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus-within:border-brand-500/50 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all'>
                                    <Search className='h-5 w-5 text-brand-500' />
                                    <input
                                        type="text"
                                        placeholder='Job title, keyword...'
                                        onChange={(e) => setQuery(e.target.value)}
                                        className='w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 text-sm font-medium'
                                    />
                                </div>
                                
                                <div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus-within:border-brand-500/50 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all'>
                                    <MapPin className='h-5 w-5 text-brand-500' />
                                    <input
                                        type="text"
                                        placeholder='Location'
                                        onChange={(e) => setLocation(e.target.value)}
                                        className='w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 text-sm font-medium'
                                    />
                                </div>
                                
                                <Button 
                                    onClick={searchJobHandler} 
                                    className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 rounded-xl transition-all shadow-md shadow-brand-500/20 hover:-translate-y-0.5 font-bold text-base"
                                >
                                    Find Jobs
                                </Button>
                            </motion.div>

                            <div className='space-y-8 pt-4'>
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className='flex flex-wrap gap-3 items-center'
                                >
                                    <span className='text-slate-500 font-medium text-sm'>Popular Searches:</span>
                                    <div className='flex flex-wrap gap-2'>
                                        {popularSearches.map(({ tag, delay }) => (
                                            <motion.span 
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.8 + delay }}
                                                className='px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm'
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'
                                >
                                    {stats.map((stat, index) => (
                                        <motion.div 
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                            className='flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow'
                                        >
                                            <div className='p-3 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'>
                                                {stat.icon}
                                            </div>
                                            <div>
                                                <div className='text-2xl font-extrabold text-slate-900 dark:text-white'>
                                                    {stat.count}
                                                </div>
                                                <div className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Illustration */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='flex-1 relative hidden lg:block'
                    >
                        <div className='absolute inset-0 bg-gradient-to-tr from-brand-100 to-violet-100 dark:from-brand-900/30 dark:to-violet-900/30 rounded-full filter blur-3xl opacity-50 animate-pulse'></div>
                        <motion.img 
                            src={heroIllustration} 
                            alt="Job search illustration" 
                            className='relative w-full max-w-lg mx-auto drop-shadow-2xl animate-float'
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection