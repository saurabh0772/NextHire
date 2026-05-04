import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8'>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Manage Jobs
            </span>
          </h1>
          <p className="text-slate-400">Create and manage your job listings</p>
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-end mb-6'>
            <Button
              onClick={() => navigate("/recruiter/jobs/create")}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
          <div className='rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden'>
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminJobs