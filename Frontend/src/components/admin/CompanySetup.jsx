import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Building2, Globe2, MapPin, FileImage, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
                if (res.data.success) {
                    toast.success(res.data.message);
                    const companyRes = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, {
                        withCredentials: true
                    });
                    if (companyRes.data.success) {
                        setInput({
                            name: companyRes.data.company.name || "",
                            description: companyRes.data.company.description || "",
                            website: companyRes.data.company.website || "",
                            location: companyRes.data.company.location || "",
                            file: companyRes.data.company.file || null
                        });
                        dispatch(setSingleCompany(companyRes.data.company));
                    }
                    navigate("/recruiter/companies");
                }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update company");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28'>
                <div className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm'>
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800'>
                        <div className='flex items-center gap-4'>
                            <Button 
                                onClick={() => navigate("/recruiter/companies")} 
                                variant="outline" 
                                className="h-10 w-10 p-0 rounded-xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className='text-2xl font-extrabold text-slate-900 dark:text-white'>
                                    Company Setup
                                </h1>
                                <p className='text-slate-500 dark:text-slate-400 font-medium'>Manage your company details and branding</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-8">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='space-y-3'>
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Company Name</Label>
                                <div className='relative'>
                                    <Building2 className='absolute left-4 top-3.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                        placeholder="Enter company name"
                                    />
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Website</Label>
                                <div className='relative'>
                                    <Globe2 className='absolute left-4 top-3.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Location</Label>
                                <div className='relative'>
                                    <MapPin className='absolute left-4 top-3.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Company Logo</Label>
                                <div className='relative'>
                                    <FileImage className='absolute left-4 top-3.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="pl-12 h-12 pt-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 rounded-xl focus:border-brand-500 focus:ring-brand-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100 dark:file:bg-brand-900/30 dark:file:text-brand-400 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <Label className="text-slate-700 dark:text-slate-300 font-bold">Description</Label>
                            <Textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-brand-500 focus:ring-brand-500 transition-all font-medium min-h-[120px] p-4"
                                placeholder="Tell us about your company, its mission, and culture..."
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                            <Button 
                                type="submit" 
                                className="w-full sm:w-auto px-8 h-12 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Saving Changes...
                                    </>
                                ) : (
                                    'Save Company Profile'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup