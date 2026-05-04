import React from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import AppliedJobTable from './AppliedJobTable';

const Profile = () => {
  useGetAppliedJobs();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <UpdateProfileDialog />
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
