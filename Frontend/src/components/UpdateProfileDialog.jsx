import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/authSlice';
import ResumeParser from './shared/ResumeParser';
import { Sparkles, Save, Loader2, Upload } from 'lucide-react';

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
  const [openParser, setOpenParser] = useState(false);

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
      if (updateProfile.fulfilled.match(resultAction)) {
        setSuccess('Profile updated successfully');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Update profile error:', err);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Edit Profile</h2>
      
      {error && <div className="p-3 mb-6 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium">{error}</div>}
      {success && <div className="p-3 mb-6 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium">{success}</div>}
      
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
            required
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
            required
          />
        </div>

        {user?.role !== 'recruiter' && (
          <>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Skills (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node, Express..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium"
              />
            </div>
          </>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Profile Photo</label>
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
              <Upload className="w-6 h-6 mb-2 text-brand-500" />
              <p className="text-sm font-medium">{profilePhoto ? profilePhoto.name : (user?.profilePhotoName || "Click to upload image")}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {user?.role !== 'recruiter' && (
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Resume</label>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                  <Upload className="w-6 h-6 mb-2 text-brand-500" />
                  <p className="text-sm font-medium">{resume ? resume.name : (user?.resumeName || "Click to upload PDF")}</p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
              </label>
              
              <button
                type="button"
                onClick={() => setOpenParser(true)}
                className="w-full flex items-center justify-center gap-2 bg-violet-100 hover:bg-violet-200 text-violet-700 dark:bg-violet-900/30 dark:hover:bg-violet-900/50 dark:text-violet-400 px-4 py-3 rounded-xl transition-colors font-bold text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Auto-fill Profile with AI Resume Parser
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-3.5 rounded-xl transition-all shadow-md shadow-brand-500/20 font-bold mt-4"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
                <Save className="h-5 w-5" />
                Save Changes
            </>
          )}
        </button>
      </form>
      <ResumeParser open={openParser} setOpen={setOpenParser} />
    </div>
  );
};

export default UpdateProfileDialog;