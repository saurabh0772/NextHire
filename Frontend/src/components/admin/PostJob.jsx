import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Building2, IndianRupee, MapPin, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { Label } from '../ui/label'

const PostJob = () => {
    useGetAllCompanies();
    const { companies } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        companyId: '',
        location: '',
        salary: '',
        jobType: 'Full-time',
        experience: 0,
        status: 'Active',
        position: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${JOB_API_END_POINT}/post`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/recruiter/jobs');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        if (name === 'company') {
            setFormData(prev => ({
                ...prev,
                companyId: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
                <div className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm'>
                    {/* Header */}
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800'>
                        <div className='flex items-center gap-4'>
                            <Button 
                                onClick={() => navigate("/recruiter/jobs")} 
                                variant="outline" 
                                className="h-10 w-10 p-0 rounded-xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className='text-2xl font-extrabold text-slate-900 dark:text-white'>
                                    Post a New Job
                                </h1>
                                <p className='text-slate-500 dark:text-slate-400 font-medium'>Create a new job listing for your company</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-brand-500 pl-3">Basic Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Job Title</Label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <Input
                                            required
                                            name="title"
                                            placeholder="e.g. Senior Frontend Developer"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Company</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                                        <Select 
                                            required
                                            value={formData.companyId}
                                            onValueChange={(value) => handleSelectChange('company', value)}
                                        >
                                            <SelectTrigger className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-brand-500 font-medium">
                                                <SelectValue placeholder="Select company" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                                                {companies.length === 0 ? (
                                                    <p className="p-4 text-center text-slate-500 font-medium text-sm">Please register a company first.</p>
                                                ) : (
                                                    companies.map(company => (
                                                        <SelectItem 
                                                            key={company._id} 
                                                            value={company._id}
                                                            className="text-slate-700 dark:text-slate-300 focus:bg-brand-50 dark:focus:bg-brand-900/20 font-medium cursor-pointer"
                                                        >
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <Input
                                            required
                                            name="location"
                                            placeholder="e.g. Remote, or New York, NY"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Salary (LPA)</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <Input
                                            required
                                            name="salary"
                                            placeholder="e.g. 15-20"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Job Type</Label>
                                    <Select 
                                        required
                                        value={formData.jobType}
                                        onValueChange={(value) => handleSelectChange('jobType', value)}
                                    >
                                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-brand-500 font-medium">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                                            {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                                <SelectItem 
                                                    key={type} 
                                                    value={type}
                                                    className="text-slate-700 dark:text-slate-300 focus:bg-brand-50 dark:focus:bg-brand-900/20 font-medium cursor-pointer"
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Experience Level</Label>
                                    <Select 
                                        required
                                        value={formData.experience}
                                        onValueChange={(value) => handleSelectChange('experience', value)}
                                    >
                                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-brand-500 font-medium">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                                            {[
                                                { value: 0, label: 'Entry Level (0-2 years)' },
                                                { value: 1, label: 'Mid Level (3-5 years)' },
                                                { value: 2, label: 'Senior Level (5-8 years)' },
                                                { value: 3, label: 'Executive (8+ years)' }
                                            ].map(exp => (
                                                <SelectItem 
                                                    key={exp.value} 
                                                    value={exp.value}
                                                    className="text-slate-700 dark:text-slate-300 focus:bg-brand-50 dark:focus:bg-brand-900/20 font-medium cursor-pointer"
                                                >
                                                    {exp.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Status</Label>
                                    <Select 
                                        required
                                        value={formData.status}
                                        onValueChange={(value) => handleSelectChange('status', value)}
                                    >
                                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-brand-500 font-medium">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                                            {['Active', 'Draft', 'Closed'].map(status => (
                                                <SelectItem 
                                                    key={status} 
                                                    value={status}
                                                    className="text-slate-700 dark:text-slate-300 focus:bg-brand-50 dark:focus:bg-brand-900/20 font-medium cursor-pointer"
                                                >
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Number of Positions</Label>
                                    <Input
                                        required
                                        type="number"
                                        min="1"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description & Requirements */}
                        <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-brand-500 pl-3">Job Details</h2>
                            
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Description</Label>
                                    <Textarea
                                        required
                                        name="description"
                                        placeholder="Describe the role, responsibilities, and team..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="min-h-[140px] p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Requirements & Skills</Label>
                                    <Textarea
                                        required
                                        name="requirements"
                                        placeholder="List the required skills, qualifications, and experience (comma separated for skills)"
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        className="min-h-[140px] p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/recruiter/jobs')}
                                className="h-12 px-6 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading || companies.length === 0}
                                className="h-12 px-8 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Job'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob