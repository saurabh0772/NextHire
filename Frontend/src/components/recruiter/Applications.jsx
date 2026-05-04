import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { ClipboardList, Loader2 } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Applications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${APPLICATION_API_END_POINT}/recruiter/all`, {
                    withCredentials: true
                })
                if (response.data.success) {
                    setApplications(response.data.applications)
                }
            } catch (error) {
                console.error('Error fetching applications:', error)
                toast.error(error.response?.data?.message || 'Failed to fetch applications')
            } finally {
                setLoading(false)
            }
        }

        fetchApplications()
    }, [])

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'bg-green-400/10 text-green-400 border-green-400/20'
            case 'rejected':
                return 'bg-red-400/10 text-red-400 border-red-400/20'
            default:
                return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <ClipboardList className="h-8 w-8 text-blue-400" />
                        <h1 className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                All Applications
                            </span>
                        </h1>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-400">View and manage all job applications</p>
                        <div className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10">
                            <span className="text-slate-400">Total Applications: </span>
                            <span className="text-white font-semibold">{applications.length}</span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                            <p className="ml-2 text-slate-400">Loading applications...</p>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-slate-400">No applications found</p>
                        </div>
                    ) : (
                        <div className="relative overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10">
                                        <TableHead className="text-slate-400">Applicant</TableHead>
                                        <TableHead className="text-slate-400">Job Title</TableHead>
                                        <TableHead className="text-slate-400">Company</TableHead>
                                        <TableHead className="text-slate-400">Applied On</TableHead>
                                        <TableHead className="text-slate-400">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {applications.map((application) => (
                                        <TableRow 
                                            key={application._id} 
                                            className="border-white/10 cursor-pointer hover:bg-white/5"
                                            onClick={() => navigate(`/recruiter/jobs/${application.job?._id}/applicants`)}
                                        >
                                            <TableCell className="font-medium text-white">
                                                {application.applicant?.fullname || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-slate-300">
                                                {application.job?.title || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-slate-300">
                                                {application.job?.company?.name || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-slate-300">
                                                {new Date(application.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant="outline" 
                                                    className={getStatusColor(application.status)}
                                                >
                                                    {application.status || 'Pending'}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Applications 