import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Sparkles, Loader2, UploadCloud, FileText, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { RESUME_API_END_POINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

const ResumeParser = ({ open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      toast.error('Only PDF files are supported');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setParsedData(null); // Reset parsed data on new file
  };

  const handleParse = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post(`${RESUME_API_END_POINT}/parse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setParsedData(res.data.parsedData);
        toast.success(res.data.message || 'Resume parsed and profile updated!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to parse resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (isOpen) => {
    if (!isOpen) {
      setFile(null);
      setParsedData(null);
      setLoading(false);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="text-purple-500 h-5 w-5" />
            AI Resume Parser
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Upload your resume and let AI auto-fill your profile details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!parsedData ? (
            <>
              {/* Section 1 — Upload Area */}
              {!file ? (
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={loading}
                  />
                  <div className="border-dashed border-2 border-violet-300 rounded-xl p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="h-10 w-10 text-violet-400 mb-2" />
                    <p className="font-medium text-slate-700 dark:text-slate-200">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF files only • Max 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="border border-violet-200 bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-violet-100 p-2 rounded-lg shrink-0">
                      <FileText className="h-6 w-6 text-violet-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {file.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:text-red-500 shrink-0"
                    onClick={() => setFile(null)}
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Section 2 — Parse Button */}
              <Button
                onClick={handleParse}
                disabled={!file || loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-all h-11"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Parse Resume with AI
                  </>
                )}
              </Button>
            </>
          ) : (
            /* Section 3 — Results Panel */
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <p className="font-medium">Profile updated successfully!</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4 border border-slate-100 dark:border-slate-700 max-h-[60vh] overflow-y-auto">
                {/* Name, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Name</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{parsedData.fullname || '-'}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-slate-500 block text-xs">Email</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{parsedData.email || '-'}</span>
                  </div>
                  <div className="md:col-span-3">
                    <span className="text-slate-500 block text-xs">Phone</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{parsedData.phoneNumber || '-'}</span>
                  </div>
                </div>

                {/* Bio */}
                {parsedData.bio && (
                  <div>
                    <span className="text-slate-500 block text-xs mb-1">Professional Summary</span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{parsedData.bio}</p>
                  </div>
                )}

                {/* Skills */}
                {parsedData.skills && parsedData.skills.length > 0 && (
                  <div>
                    <span className="text-slate-500 block text-xs mb-1">Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {parsedData.education && parsedData.education.length > 0 && (
                  <div>
                    <span className="text-slate-500 block text-xs mb-1">Education</span>
                    <ul className="space-y-1">
                      {parsedData.education.map((edu, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                          <span className="font-medium">{edu.degree || 'Degree'}</span>
                          {edu.institution && ` — ${edu.institution}`}
                          {edu.year && ` (${edu.year})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Experience */}
                {parsedData.experience && parsedData.experience.length > 0 && (
                  <div>
                    <span className="text-slate-500 block text-xs mb-1">Experience</span>
                    <ul className="space-y-2">
                      {parsedData.experience.map((exp, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                          <span className="font-medium">{exp.title || 'Role'}</span>
                          {exp.company && ` at ${exp.company}`}
                          {exp.duration && <span className="text-slate-500 text-xs ml-1">• {exp.duration}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <p className="text-sm text-green-600 text-center flex items-center justify-center gap-1">
                ✓ Your profile has been updated with the above information
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeParser;
