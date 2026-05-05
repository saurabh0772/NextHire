import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 p-2 rounded-xl">
                            <Building2 className="h-6 w-6" />
                        </div>
                        Manage Companies
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Create and manage your company profiles</p>
                </div>

                <div className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'>
                        <div className='relative w-full sm:w-96'>
                            <Search className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                            <input
                                placeholder="Search companies..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full pl-10 pr-4 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/recruiter/companies/create")}
                            className="w-full sm:w-auto h-11 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all"
                        >
                            <Plus className="h-5 w-5 mr-1.5" />
                            Add New Company
                        </Button>
                    </div>
                    <div className='overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800'>
                        <CompaniesTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Companies