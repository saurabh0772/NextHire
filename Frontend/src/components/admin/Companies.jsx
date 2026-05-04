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
    }, [input]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Manage Companies
                        </span>
                    </h1>
                    <p className="text-slate-400">Create and manage your company profiles</p>
                </div>

                <div className='max-w-6xl mx-auto'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8'>
                        <div className='relative w-full sm:w-96'>
                            <Search className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
                            <Input
                                placeholder="Search companies..."
                                onChange={(e) => setInput(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 w-full"
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/recruiter/companies/create")}
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white w-full sm:w-auto"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Company
                        </Button>
                    </div>
                    <div className='rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden'>
                        <CompaniesTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Companies