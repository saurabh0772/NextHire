import React from 'react'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'

const AdminJobs = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-semibold'>Jobs</h1>
                    <button onClick={() => navigate("/admin/jobs/create")} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Post Job</button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs 