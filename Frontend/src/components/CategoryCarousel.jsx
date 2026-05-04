import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ChevronLeft, ChevronRight, Code, Database, Brain, Palette, Layout } from 'lucide-react';

const categories = [
    {
        name: "Frontend Developer",
        gradient: "from-blue-500 to-cyan-400",
        icon: <Layout className="w-5 h-5" />
    },
    {
        name: "Backend Developer",
        gradient: "from-indigo-500 to-blue-400",
        icon: <Database className="w-5 h-5" />
    },
    {
        name: "Data Science",
        gradient: "from-violet-500 to-indigo-400",
        icon: <Brain className="w-5 h-5" />
    },
    {
        name: "Graphic Designer",
        gradient: "from-fuchsia-500 to-violet-400",
        icon: <Palette className="w-5 h-5" />
    },
    {
        name: "FullStack Developer",
        gradient: "from-blue-500 to-cyan-400",
        icon: <Code className="w-5 h-5" />
    }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const { allJobs } = useSelector(store => store.job);
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const getJobCountForCategory = (categoryName) => {
        return allJobs.filter(job => 
            job.title.toLowerCase().includes(categoryName.toLowerCase())
        ).length;
    }

    return (
        <div className='bg-gradient-to-b from-slate-900 to-slate-900/50 py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-10'>
                    <h2 className='text-2xl font-bold'>
                        <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                            Browse by Category
                        </span>
                    </h2>
                    <p className='text-slate-400 mt-2'>Explore opportunities in your preferred domain</p>
                </div>

                <Carousel 
                    className="w-full max-w-5xl mx-auto relative group"
                    opts={{
                        align: "start",
                    }}
                    onSelect={(index) => setActiveIndex(index)}
                >
                    <CarouselContent className="-ml-4">
                        {categories.map((cat, index) => (
                            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <button
                                    onClick={() => searchJobHandler(cat.name)}
                                    className={`relative w-full p-6 rounded-2xl transition-all duration-300
                                        ${activeIndex === index 
                                            ? 'bg-gradient-to-br ' + cat.gradient + ' scale-105'
                                            : 'bg-slate-800/50 hover:bg-slate-800'
                                        }
                                        group/item backdrop-blur-xl border border-white/5 hover:border-white/10
                                        transform hover:-translate-y-1`}
                                >
                                    {/* Glowing effect */}
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.gradient} opacity-0 
                                        group-hover/item:opacity-10 blur-xl transition-opacity`}></div>
                                    
                                    {/* Content */}
                                    <div className='relative z-10 text-center space-y-3'>
                                        <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center
                                            ${activeIndex === index 
                                                ? 'bg-white/20' 
                                                : 'bg-gradient-to-br ' + cat.gradient
                                            }`}
                                        >
                                            <div className={activeIndex === index ? 'text-white' : 'text-white'}>
                                                {cat.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className={`font-medium ${
                                                activeIndex === index ? 'text-white' : 'text-slate-300'
                                            }`}>
                                                {cat.name}
                                            </h3>
                                            <p className={`text-sm mt-1 ${
                                                activeIndex === index ? 'text-white/80' : 'text-slate-400'
                                            }`}>
                                                {getJobCountForCategory(cat.name)} Jobs
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <div className='hidden md:block'>
                        <CarouselPrevious 
                            className="absolute -left-12 opacity-0 group-hover:opacity-100 bg-slate-800 border-white/10 
                                text-white hover:bg-slate-700 hover:border-white/20 transition-all"
                        />
                        <CarouselNext 
                            className="absolute -right-12 opacity-0 group-hover:opacity-100 bg-slate-800 border-white/10 
                                text-white hover:bg-slate-700 hover:border-white/20 transition-all"
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel