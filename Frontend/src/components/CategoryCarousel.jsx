import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ChevronLeft, ChevronRight, Code, Database, Brain, Palette, Layout } from 'lucide-react';

const categories = [
    {
        name: "Frontend Developer",
        colorClass: "text-blue-500",
        bgClass: "bg-blue-50 dark:bg-blue-900/20",
        icon: <Layout className="w-6 h-6" />
    },
    {
        name: "Backend Developer",
        colorClass: "text-indigo-500",
        bgClass: "bg-indigo-50 dark:bg-indigo-900/20",
        icon: <Database className="w-6 h-6" />
    },
    {
        name: "Data Science",
        colorClass: "text-violet-500",
        bgClass: "bg-violet-50 dark:bg-violet-900/20",
        icon: <Brain className="w-6 h-6" />
    },
    {
        name: "Graphic Designer",
        colorClass: "text-fuchsia-500",
        bgClass: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
        icon: <Palette className="w-6 h-6" />
    },
    {
        name: "FullStack Developer",
        colorClass: "text-brand-500",
        bgClass: "bg-brand-50 dark:bg-brand-900/20",
        icon: <Code className="w-6 h-6" />
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
        <div className='bg-white dark:bg-slate-950 py-16 relative border-y border-slate-100 dark:border-slate-900'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-extrabold text-slate-900 dark:text-white'>
                        Browse by <span className='text-brand-600 dark:text-brand-400'>Category</span>
                    </h2>
                    <p className='text-slate-500 dark:text-slate-400 mt-3 font-medium'>Explore opportunities in your preferred domain</p>
                </div>

                <Carousel 
                    className="w-full max-w-6xl mx-auto relative group"
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
                                            ? 'bg-white dark:bg-slate-900 border-brand-500 shadow-md shadow-brand-500/10 scale-100'
                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 hover:shadow-sm'
                                        }
                                        group/item border transform hover:-translate-y-1 text-left`}
                                >
                                    {/* Content */}
                                    <div className='relative z-10 flex flex-col gap-4'>
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors
                                            ${activeIndex === index ? 'bg-brand-600 text-white' : cat.bgClass + ' ' + cat.colorClass}
                                            group-hover/item:bg-brand-600 group-hover/item:text-white`}
                                        >
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg leading-tight transition-colors ${
                                                activeIndex === index ? 'text-brand-700 dark:text-brand-400' : 'text-slate-900 dark:text-white group-hover/item:text-brand-600 dark:group-hover/item:text-brand-400'
                                            }`}>
                                                {cat.name}
                                            </h3>
                                            <p className='text-sm mt-1 font-medium text-slate-500 dark:text-slate-400'>
                                                {getJobCountForCategory(cat.name)} Open Positions
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <div className='hidden md:block'>
                        <CarouselPrevious 
                            className="absolute -left-16 opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 
                                text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 transition-all h-12 w-12 shadow-sm"
                        />
                        <CarouselNext 
                            className="absolute -right-16 opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 
                                text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 transition-all h-12 w-12 shadow-sm"
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel