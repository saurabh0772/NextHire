import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, DollarSign, Clock } from 'lucide-react'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div className='group flex flex-col justify-between h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1'>
            <div className='space-y-4'>
                {/* Header: Company & Time */}
                <div className='flex items-start justify-between'>
                    <div className='flex gap-4'>
                        <div className='w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2 group-hover:scale-105 transition-transform'>
                            {job?.company?.logo ? (
                                <img 
                                    src={`${job?.company?.logo}?t=${new Date().getTime()}`} 
                                    alt={job?.company?.name} 
                                    className='w-full h-full object-contain'
                                />
                            ) : (
                                <Building2 className='w-6 h-6 text-brand-500' />
                            )}
                        </div>
                        <div>
                            <h3 className='font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1'>
                                {job?.company?.name}
                            </h3>
                            <div className='flex items-center gap-1.5 text-sm font-medium text-slate-500 mt-1'>
                                <MapPin size={14} className="text-slate-400" />
                                <span className="line-clamp-1">{job?.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-800'>
                        <Clock size={12} />
                        {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                    </div>
                </div>

                {/* Job Title & Desc */}
                <div className='space-y-2 pt-2'>
                    <h2 className='text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2'>
                        {job?.title}
                    </h2>
                    <p className='text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed'>
                        {job?.description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-none rounded-md px-2.5 py-0.5 text-xs font-semibold">
                        {job?.position} Positions
                    </Badge>
                    <Badge variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 border-none rounded-md px-2.5 py-0.5 text-xs font-semibold">
                        {job?.jobType}
                    </Badge>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none rounded-md px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
                        <DollarSign size={12} /> {job?.salary} LPA
                    </Badge>
                </div>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800'>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }}
                    variant="outline"
                    className="flex-1 bg-transparent hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 border-slate-200 dark:border-slate-700 font-semibold h-11 rounded-xl transition-colors"
                >
                    View Details
                </Button>
            </div>
        </div>
    )
}

export default Job