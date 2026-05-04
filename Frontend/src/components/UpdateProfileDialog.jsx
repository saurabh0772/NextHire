import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/authSlice';

const UpdateProfileDialog = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setBio(user.profile?.bio || '');
      setSkills(user.profile?.skills?.join(', ') || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('bio', bio);
    formData.append('skills', skills);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const resultAction = await dispatch(updateProfile(formData));
      console.log('Update profile result:', resultAction);
      if (updateProfile.fulfilled.match(resultAction)) {
        setSuccess('Profile updated successfully');
      }
    } catch (err) {
      console.error('Update profile error:', err);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Updating profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full border border-gray-700 bg-slate-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-700 bg-slate-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-700 bg-slate-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {user?.role !== 'recruiter' && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border border-gray-700 bg-slate-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Skills (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border border-gray-700 bg-slate-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block mb-1">Profile Photo</label>
          <label className="flex items-center space-x-4 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-6v6a1 1 0 001 1h3m-6 4v4m-4-4v4m-4-4v4" />
            </svg>
            <span>{profilePhoto ? profilePhoto.name : (user?.profilePhotoName || "Choose file")}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
        {user?.role !== 'recruiter' && (
          <div className="mb-4">
            <label className="block mb-1">Resume (PDF only)</label>
            <label className="flex items-center space-x-4 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-6v6a1 1 0 001 1h3m-6 4v4m-4-4v4m-4-4v4" />
              </svg>
              <span>{resume ? resume.name : (user?.resumeName || "Choose file")}</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileDialog;