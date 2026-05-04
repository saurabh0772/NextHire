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
                    // Refetch company data after update
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
                    // Do not navigate away to allow UI update
                    // navigate("/admin/companies");
                }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-[#0A0F1C]">
            <div className="sticky top-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-lg border-b border-slate-700">
                <Navbar />
            </div>
            <div className='max-w-4xl mx-auto px-4 py-12 mt-8'>
                <div className='bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700'>
                    <div className='flex items-center gap-3 mb-8'>
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            variant="outline" 
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className='font-bold text-2xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent'>
                                Company Setup
                            </h1>
                            <p className='text-slate-400'>Update your company's profile and information</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label className="text-slate-300">Company Name</Label>
                                <div className='relative'>
                                    <Building2 className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                                        placeholder="Enter company name"
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-300">Website</Label>
                                <div className='relative'>
                                    <Globe2 className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                                        placeholder="Enter company website"
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-300">Location</Label>
                                <div className='relative'>
                                    <MapPin className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                                        placeholder="Enter company location"
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-300">Company Logo</Label>
                                <div className='relative'>
                                    <FileImage className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 file:bg-slate-700 file:text-slate-200 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-slate-600 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label className="text-slate-300">Description</Label>
                            <Textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 min-h-[100px]"
                                placeholder="Enter company description"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </>
                            ) : (
                                'Update Company'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup