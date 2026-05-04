import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Building2, Calendar } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'rejected':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'accepted':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            default:
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        }
    };

    if (allAppliedJobs.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-slate-400'>You haven't applied to any jobs yet.</p>
            </div>
        );
    }

    return (
        <div className='p-4'>
            <Table>
                <TableHeader>
                    <TableRow className='border-white/10'>
                        <TableHead className='text-slate-400'>Date</TableHead>
                        <TableHead className='text-slate-400'>Company</TableHead>
                        <TableHead className='text-slate-400'>Position</TableHead>
                        <TableHead className='text-slate-400 text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((application) => (
                        <TableRow 
                            key={application._id}
                            className='border-white/10 hover:bg-white/5'
                        >
                            <TableCell className='text-slate-300 flex items-center gap-2'>
                                <Calendar className='h-4 w-4 text-blue-400' />
                                {application?.createdAt?.split("T")[0]}
                            </TableCell>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-1.5 flex items-center justify-center'>
                                        {application.job?.company?.logo ? (
                                            <img 
                                                src={`${application.job?.company?.logo}?t=${new Date().getTime()}`} 
                                                alt={application.job?.company?.name} 
                                                className='w-full h-full object-contain'
                                            />
                                        ) : (
                                            <Building2 className='w-4 h-4 text-white' />
                                        )}
                                    </div>
                                    <span className='text-slate-300'>{application.job?.company?.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className='text-slate-300'>{application.job?.title}</TableCell>
                            <TableCell className='text-right'>
                                <Badge 
                                    variant="outline" 
                                    className={getStatusColor(application.status)}
                                >
                                    {application.status.toUpperCase()}
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