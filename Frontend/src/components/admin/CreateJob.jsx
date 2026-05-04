import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Building2, IndianRupee } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const CreateJob = () => {
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
        experience: 'Entry Level',
        position: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const postData = {
                ...formData,
                requirements: formData.requirements.split(',').map(req => req.trim())
            };
            console.log('Posting job data:', postData);
            const response = await axios.post('/api/v1/job/post', postData);
            toast.success('Job posted successfully!');
            navigate('/recruiter/jobs');
        } catch (error) {
            console.error('Error posting job:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Post New Job
                        </span>
                    </h1>
                    <p className="text-slate-400">Create a new job listing for your company</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Basic Information</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-400">Job Title</label>
                                        <div className="relative mt-1">
                                            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                            <Input
                                                required
                                                name="title"
                                                placeholder="e.g. Senior Frontend Developer"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-400">Company</label>
                                        <div className="relative mt-1">
                                            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 pointer-events-none" />
                                            <Select 
                                                required
                                                value={formData.companyId}
                                                onValueChange={(value) => handleSelectChange('companyId', value)}
                                            >
                                                <SelectTrigger className="pl-10 bg-white/5 border-white/10 text-white">
                                                    <SelectValue placeholder="Select company" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10">
                                                    {companies.map(company => (
                                                        <SelectItem 
                                                            key={company._id} 
                                                            value={company._id}
                                                            className="text-white hover:bg-white/5"
                                                        >
                                                            {company.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-400">Location</label>
                                            <Input
                                                required
                                                name="location"
                                                placeholder="e.g. Mumbai, India"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-400">Salary</label>
                                            <div className="relative mt-1">
                                                <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                                <Input
                                                    required
                                                    type="number"
                                                    name="salary"
                                                    placeholder="e.g. 1500000"
                                                    value={formData.salary}
                                                    onChange={handleChange}
                                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-400">Position</label>
                                        <Input
                                            required
                                            name="position"
                                            placeholder="e.g. Frontend Developer"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-400">Job Type</label>
                                            <Select 
                                                required
                                                value={formData.jobType}
                                                onValueChange={(value) => handleSelectChange('jobType', value)}
                                            >
                                                <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10">
                                                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                                        <SelectItem 
                                                            key={type} 
                                                            value={type}
                                                            className="text-white hover:bg-white/5"
                                                        >
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-slate-400">Experience</label>
                                            <Select 
                                                required
                                                value={formData.experience}
                                                onValueChange={(value) => handleSelectChange('experience', value)}
                                            >
                                                <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10">
                                                    {['Entry Level', 'Mid Level', 'Senior Level', 'Executive'].map(exp => (
                                                        <SelectItem 
                                                            key={exp} 
                                                            value={exp}
                                                            className="text-white hover:bg-white/5"
                                                        >
                                                            {exp}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Job Details</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-400">Description</label>
                                        <Textarea
                                            required
                                            name="description"
                                            placeholder="Enter job description..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-400">Requirements</label>
                                        <Textarea
                                            required
                                            name="requirements"
                                            placeholder="Enter job requirements..."
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            className="mt-1 min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/recruiter/jobs')}
                                className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
                            >
                                {loading ? 'Posting...' : 'Post Job'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateJob
