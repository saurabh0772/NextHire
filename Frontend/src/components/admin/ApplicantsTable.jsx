import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, MoreHorizontal, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Badge } from '../ui/badge';

const shortlistingStatus = [
    { label: "Accepted", icon: Check, color: "text-green-400" },
    { label: "Rejected", icon: X, color: "text-red-400" }
];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    if (!applicants?.applications?.length) {
        return (
            <div className="text-center py-10">
                <p className="text-slate-400">No applications found for this position</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-white/10">
                        <TableHead className="text-slate-400">Full Name</TableHead>
                        <TableHead className="text-slate-400">Email</TableHead>
                        <TableHead className="text-slate-400">Contact</TableHead>
                        <TableHead className="text-slate-400">Resume</TableHead>
                        <TableHead className="text-slate-400">Applied On</TableHead>
                        <TableHead className="text-slate-400 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="border-white/10">
                            <TableCell className="font-medium text-white">
                                {item?.applicant?.fullname}
                            </TableCell>
                            <TableCell className="text-slate-300">
                                {item?.applicant?.email}
                            </TableCell>
                            <TableCell className="text-slate-300">
                                {item?.applicant?.phoneNumber}
                            </TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        href={item?.applicant?.profile?.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        View Resume
                                    </a>
                                ) : (
                                    <Badge variant="secondary" className="bg-white/5 text-slate-400">
                                        Not Available
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-slate-300">
                                {new Date(item?.applicant.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button 
                                            variant="ghost" 
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/5"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 bg-slate-900 border-white/10">
                                        {shortlistingStatus.map(({ label, icon: Icon, color }) => (
                                            <button
                                                key={label}
                                                onClick={() => statusHandler(label, item?._id)}
                                                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                                            >
                                                <Icon className={`h-4 w-4 ${color}`} />
                                                {label}
                                            </button>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable