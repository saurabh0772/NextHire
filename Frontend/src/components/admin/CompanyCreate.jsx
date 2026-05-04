import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowRight } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-[#0A0F1C] relative">
            <div className="sticky top-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-lg border-b border-slate-700">
                <Navbar />
            </div>
            <div className='max-w-4xl mx-auto px-4 py-12 mt-8'>
                <div className='bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='p-2 rounded-lg bg-violet-500/10'>
                            <Building2 className="w-6 h-6 text-violet-500" />
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent'>
                                Create Your Company Profile
                            </h1>
                            <p className='text-slate-400'>
                                Start your journey by setting up your company's presence
                            </p>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div>
                            <Label className="text-slate-300">Company Name</Label>
                            <Input
                                type="text"
                                className="mt-2 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500"
                                placeholder="e.g. Microsoft, Google, Tesla"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <p className='mt-2 text-sm text-slate-400'>
                                This will be your company's public name. You can change this later.
                            </p>
                        </div>

                        <div className='flex items-center gap-3 pt-4'>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate("/admin/companies")}
                                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={registerNewCompany}
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                                disabled={!companyName}
                            >
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate