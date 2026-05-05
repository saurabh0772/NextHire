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
                navigate(`/recruiter/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28'>
                <div className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm'>
                    <div className='flex items-center gap-4 mb-8'>
                        <div className='p-3 rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'>
                            <Building2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
                                Register New Company
                            </h1>
                            <p className='text-slate-500 dark:text-slate-400 font-medium mt-1'>
                                Start your hiring journey by setting up your company profile
                            </p>
                        </div>
                    </div>

                    <div className='space-y-8'>
                        <div className="space-y-3">
                            <Label className="text-slate-700 dark:text-slate-300 font-bold text-base">Company Name</Label>
                            <Input
                                type="text"
                                className="h-14 text-lg px-5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500 rounded-xl transition-all"
                                placeholder="e.g. Acme Corporation, TechFlow"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <p className='text-sm text-slate-500 font-medium'>
                                This will be your company's public name on NextHire. You can update this later.
                            </p>
                        </div>

                        <div className='flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 mt-8'>
                            <Button 
                                variant="outline" 
                                onClick={() => navigate("/recruiter/companies")}
                                className="h-12 px-6 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={registerNewCompany}
                                className="h-12 px-8 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all"
                                disabled={!companyName}
                            >
                                Continue to Setup
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate