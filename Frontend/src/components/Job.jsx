import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, DollarSign } from 'lucide-react'

const Job = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className='group p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer hover:shadow-xl hover:shadow-blue-500/5'>
            <div className='space-y-4'>
                {/* Company Info */}
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-2 flex items-center justify-center'>
                            {job?.company?.logo ? (
                                <img 
                                    src={`${job?.company?.logo}?t=${new Date().getTime()}`} 
                                    alt={job?.company?.name} 
                                    className='w-full h-full object-contain'
                                />
                            ) : (
                                <Building2 className='w-6 h-6 text-white' />
                            )}
                        </div>
                        <div>
                            <h3 className='font-medium text-white group-hover:text-blue-400 transition-colors'>
                                {job?.company?.name}
                            </h3>
                            <div className='flex items-center gap-2 text-sm text-slate-400'>
                                <MapPin size={14} />
                                <span>{job?.location}</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="outline" className='border-blue-500/20 text-blue-400'>
                        {job?.jobType}
                    </Badge>
                </div>

                {/* Job Info */}
                <div>
                    <h2 className='text-lg font-semibold text-white mb-2'>{job?.title}</h2>
                    <p className='text-sm text-slate-400 line-clamp-2'>{job?.description}</p>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                    <div className='flex items-center gap-2 text-slate-400'>
                        <DollarSign size={16} className="text-blue-400" />
                        <span>{job?.salary} LPA</span>
                    </div>
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Job