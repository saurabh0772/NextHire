import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, MoreHorizontal, X, FileText, Mail, Phone, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Badge } from '../ui/badge';

const shortlistingStatus = [
    { label: "Accepted", icon: Check, color: "text-emerald-500", hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
    { label: "Rejected", icon: X, color: "text-rose-500", hoverBg: "hover:bg-rose-50 dark:hover:bg-rose-900/20" }
];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                // Optionally refresh the applicant data here or handle via state if needed
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    }

    if (!applicants?.applications?.length) {
        return (
            <div className="text-center py-16">
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                        <FileText className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">No applications yet</p>
                    <p className="text-slate-500 font-medium max-w-sm">When candidates apply for this job, their applications will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Candidate</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Contact Info</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Resume</TableHead>
                        <TableHead className="text-slate-600 dark:text-slate-400 font-bold">Applied Date</TableHead>
                        <TableHead className="text-right text-slate-600 dark:text-slate-400 font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <TableCell className="font-bold text-slate-900 dark:text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-100 to-indigo-100 dark:from-brand-900/40 dark:to-indigo-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 text-lg">
                                        {item?.applicant?.fullname?.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{item?.applicant?.fullname}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium">
                                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                                        {item?.applicant?.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium">
                                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                                        {item?.applicant?.phoneNumber}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        href={item?.applicant?.profile?.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 font-bold rounded-lg text-sm transition-colors"
                                    >
                                        <FileText className="h-4 w-4" />
                                        View Resume
                                    </a>
                                ) : (
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-none font-semibold">
                                        Not Provided
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                    {new Date(item?.applicant.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button 
                                            variant="ghost" 
                                            className="h-9 w-9 p-0 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-lg mr-4">
                                        {shortlistingStatus.map(({ label, icon: Icon, color, hoverBg }) => (
                                            <button
                                                key={label}
                                                onClick={() => statusHandler(label, item?._id)}
                                                className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 rounded-lg transition-colors ${hoverBg} ${color}`}
                                            >
                                                <Icon className={`h-4 w-4`} />
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