import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Briefcase, Edit2, MoreHorizontal, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const JobsTable = () => {
    const { allAdminJobs: jobs, searchJobsByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(jobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = jobs?.length >= 0 && jobs?.filter((job) => {
            if (!searchJobsByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
                   job?.company?.name?.toLowerCase().includes(searchJobsByText.toLowerCase());
        });
        setFilterJobs(filteredJobs || []);
    }, [jobs, searchJobsByText]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'closed':
                return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
            case 'draft':
                return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20';
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-slate-400">Title</TableHead>
                    <TableHead className="text-slate-400">Company</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Applications</TableHead>
                    <TableHead className="text-slate-400">Posted</TableHead>
                    <TableHead className="text-right text-slate-400">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!filterJobs || filterJobs?.length === 0 ? (
                    <TableRow className="border-white/10">
                        <TableCell colSpan={6} className="text-center text-slate-400 py-10">
                            <div className="flex flex-col items-center gap-2">
                                <Briefcase className="h-8 w-8 text-slate-500" />
                                <p>No jobs found</p>
                                <Button 
                                    onClick={() => navigate("/recruiter/jobs/create")}
                                    variant="link" 
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    Post your first job
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : (
                    filterJobs?.map((job) => (
                        <TableRow key={job._id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-slate-400" />
                                    <span className="text-white">{job.title}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-400">{job.company?.name}</TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(job.status)} variant="outline">
                                    {job.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Users className="h-4 w-4" />
                                    <span>{job.applications?.length || 0}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-400">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 bg-slate-900 border-white/10">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5"
                                            onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
                                        >
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Job
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            {filterJobs?.length > 0 && (
                <TableCaption className="text-slate-400 mt-4">
                    Showing {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'}
                </TableCaption>
            )}
        </Table>
    )
}

export default JobsTable 