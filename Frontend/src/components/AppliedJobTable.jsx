import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Building2, Calendar } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'rejected':
                return 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border-rose-200 dark:border-rose-800/50';
            case 'accepted':
                return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
            default:
                return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
        }
    };

    if (allAppliedJobs.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700'>
                <p className='text-slate-500 font-medium'>You haven't applied to any jobs yet.</p>
            </div>
        );
    }

    return (
        <div className='overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800'>
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className='border-slate-200 dark:border-slate-800 hover:bg-transparent'>
                        <TableHead className='text-slate-600 dark:text-slate-400 font-bold'>Date Applied</TableHead>
                        <TableHead className='text-slate-600 dark:text-slate-400 font-bold'>Company</TableHead>
                        <TableHead className='text-slate-600 dark:text-slate-400 font-bold'>Position</TableHead>
                        <TableHead className='text-slate-600 dark:text-slate-400 font-bold text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((application) => (
                        <TableRow 
                            key={application._id}
                            className='border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors'
                        >
                            <TableCell className='text-slate-600 dark:text-slate-300 font-medium'>
                                <div className="flex items-center gap-2">
                                    <Calendar className='h-4 w-4 text-brand-500' />
                                    {application?.createdAt?.split("T")[0]}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-1.5 flex items-center justify-center shadow-sm'>
                                        {application.job?.company?.logo ? (
                                            <img 
                                                src={`${application.job?.company?.logo}?t=${new Date().getTime()}`} 
                                                alt={application.job?.company?.name} 
                                                className='w-full h-full object-contain'
                                            />
                                        ) : (
                                            <Building2 className='w-5 h-5 text-brand-500' />
                                        )}
                                    </div>
                                    <span className='font-bold text-slate-900 dark:text-white line-clamp-1'>{application.job?.company?.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className='text-slate-600 dark:text-slate-300 font-medium line-clamp-1 py-4 block'>
                                {application.job?.title}
                            </TableCell>
                            <TableCell className='text-right'>
                                <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(application.status)} font-bold px-3 py-1 uppercase tracking-wider text-[10px]`}
                                >
                                    {application.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable