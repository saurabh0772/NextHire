import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, MapPin, Briefcase, TrendingUp, Star, Users, ChevronRight, Sparkles } from 'lucide-react'
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
        { tag: 'UI/UX Designer', color: 'from-blue-500 to-cyan-400', delay: 0 },
        { tag: 'Programming', color: 'from-indigo-500 to-blue-400', delay: 0.1 },
        { tag: 'Digital Marketing', color: 'from-violet-500 to-indigo-400', delay: 0.2 },
        { tag: 'Video Animation', color: 'from-fuchsia-500 to-violet-400', delay: 0.3 },
    ];

    const features = [
        { text: "AI-Powered Job Matching", color: "text-blue-400" },
        { text: "Verified Companies", color: "text-cyan-400" },
        { text: "Instant Applications", color: "text-teal-400" },
    ];

    return (
        <div className='min-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-cyan-300 rounded-full blur-3xl'
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
                    className='absolute top-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-500 to-fuchsia-300 rounded-full blur-3xl'
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    className='absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-br from-fuchsia-500 to-pink-300 rounded-full blur-3xl'
                />
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-16'>
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='flex-1 max-w-2xl'
                    >
                        <div className='space-y-8'>
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-lg shadow-blue-500/30'
                            >
                                <Sparkles className='h-4 w-4' />
                                <span>Trusted by 500+ Companies</span>
                            </motion.div>
                            
                            <div className='space-y-4'>
                                <motion.h1 
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'
                                >
                                    <span className='block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent animate-gradient'>
                                        Find Your Dream
                                    </span>
                                    <span className='block text-white'>
                                        Job Today
                                    </span>
                                </motion.h1>
                                
                                <motion.p 
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className='text-xl text-slate-300'
                                >
                                    Your gateway to endless career opportunities. Connect with top companies and take the next step in your professional journey.
                                </motion.p>

                                {/* Features List */}
                                <motion.div 
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-wrap gap-4 mt-6"
                                >
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className={`p-1 rounded-full ${feature.color} bg-opacity-10`}>
                                                <ChevronRight className={`h-4 w-4 ${feature.color}`} />
                                            </div>
                                            <span className="text-slate-300">{feature.text}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                            
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className='flex flex-col md:flex-row gap-3 p-3 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10'
                            >
                                <div className='flex-1 flex items-center gap-3 px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10'>
                                    <Search className='h-5 w-5 text-blue-400' />
                                    <input
                                        type="text"
                                        placeholder='Job title, Keyword...'
                                        onChange={(e) => setQuery(e.target.value)}
                                        className='w-full bg-transparent outline-none text-white placeholder:text-slate-400'
                                    />
                                </div>
                                
                                <div className='flex items-center gap-3 px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10'>
                                    <MapPin className='h-5 w-5 text-blue-400' />
                                    <input
                                        type="text"
                                        placeholder='Location'
                                        onChange={(e) => setLocation(e.target.value)}
                                        className='w-full bg-transparent outline-none text-white placeholder:text-slate-400'
                                    />
                                </div>
                                
                                <Button 
                                    onClick={searchJobHandler} 
                                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                                >
                                    Find Job
                                </Button>
                            </motion.div>

                            <div className='space-y-6'>
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className='flex flex-wrap gap-3 items-center'
                                >
                                    <span className='text-slate-300 font-medium'>Popular:</span>
                                    <div className='flex flex-wrap gap-2'>
                                        {popularSearches.map(({ tag, color, delay }) => (
                                            <motion.span 
                                                key={tag}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.8 + delay }}
                                                className={'px-4 py-2 rounded-full bg-gradient-to-r ' + color + ' text-white text-sm font-medium cursor-pointer transform hover:scale-105 transition-all hover:shadow-lg'}
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
                                    className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8'
                                >
                                    {stats.map((stat, index) => (
                                        <motion.div 
                                            key={stat.label}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                            className='relative group p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-blue-500/20 transition-all duration-300'
                                        >
                                            {/* Glowing background effect */}
                                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl'></div>
                                            
                                            {/* Content */}
                                            <div className='relative z-10'>
                                                <div className='flex justify-center mb-3'>
                                                    <div className='p-3 rounded-xl bg-blue-500/10 text-blue-400'>
                                                        {stat.icon}
                                                    </div>
                                                </div>
                                                <div className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent'>
                                                    {stat.count}
                                                </div>
                                                <div className='text-base text-slate-400 mt-1'>
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
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='flex-1 relative'
                    >
                        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-300/20 rounded-full filter blur-3xl opacity-30 animate-pulse'></div>
                        <motion.img 
                            src={heroIllustration} 
                            alt="Job search illustration" 
                            className='relative w-full max-w-lg mx-auto drop-shadow-2xl'
                            animate={{ y: [-20, 0, -20] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

// Add these animations to your global CSS
const styles = `
@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.animate-gradient {
    animation: gradient 6s ease infinite;
    background-size: 200% auto;
}
`;

export default HeroSection