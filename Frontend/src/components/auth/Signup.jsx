import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Building2, Phone, Upload, Quote, Briefcase } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                if (res.data.user && res.data.token) {
                    dispatch(setUser(res.data));
                    navigate("/");
                } else {
                    navigate("/login");
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className='min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950'>
            <Navbar />
            
            <div className='flex-1 flex pt-16'>
                {/* Left Side: Form */}
                <div className='flex-1 flex items-center justify-center p-8 lg:p-12 w-full lg:w-1/2'>
                    <div className='w-full max-w-md'>
                        <div className='mb-8 text-center lg:text-left'>
                            <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white mb-2'>
                                Create Account
                            </h1>
                            <p className='text-slate-500 font-medium'>Join NextHire and unlock your potential.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-5'>
                            <div className='space-y-2'>
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="John Doe"
                                        className='pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Email address</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="john@example.com"
                                        className='pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <div className='space-y-2'>
                                    <Label className="text-slate-700 dark:text-slate-300 font-semibold">Phone Number</Label>
                                    <div className='relative'>
                                        <Phone className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                                        <Input
                                            type="text"
                                            value={input.phoneNumber}
                                            name="phoneNumber"
                                            onChange={changeEventHandler}
                                            placeholder="9876543210"
                                            className='pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500 rounded-xl transition-all'
                                        />
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <Label className="text-slate-700 dark:text-slate-300 font-semibold">Password</Label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                                        <Input
                                            type="password"
                                            value={input.password}
                                            name="password"
                                            onChange={changeEventHandler}
                                            placeholder="••••••••"
                                            className='pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500 rounded-xl transition-all'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-3 pt-2'>
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">I am a...</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div 
                                        onClick={() => setInput(prev => ({ ...prev, role: 'student' }))}
                                        className={`relative flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${input.role === 'student' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                        <div className='text-center flex items-center gap-2'>
                                            <User className={`h-5 w-5 ${input.role === 'student' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                                            <span className={`font-semibold ${input.role === 'student' ? 'text-brand-700 dark:text-brand-300' : 'text-slate-500'}`}>Candidate</span>
                                        </div>
                                    </div>

                                    <div 
                                        onClick={() => setInput(prev => ({ ...prev, role: 'recruiter' }))}
                                        className={`relative flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${input.role === 'recruiter' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                        <div className='text-center flex items-center gap-2'>
                                            <Building2 className={`h-5 w-5 ${input.role === 'recruiter' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                                            <span className={`font-semibold ${input.role === 'recruiter' ? 'text-brand-700 dark:text-brand-300' : 'text-slate-500'}`}>Recruiter</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Profile Photo (Optional)</Label>
                                <div className="flex items-center gap-3">
                                    <Label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2 h-12 px-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all text-sm font-medium text-slate-600 dark:text-slate-400 w-full">
                                        <Upload className="h-4 w-4" />
                                        {input.file ? input.file.name : 'Choose a file...'}
                                    </Label>
                                    <Input
                                        id="file-upload"
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || !input.email || !input.password || !input.fullname || !input.phoneNumber}
                                className="w-full h-12 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all shadow-md shadow-brand-500/20 hover:-translate-y-0.5 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>

                            <p className='text-center text-sm font-medium text-slate-500 pt-4'>
                                Already have an account?{' '}
                                <Link to="/login" className='text-brand-600 dark:text-brand-400 hover:underline'>
                                    Sign in instead
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right Side: Image/Gradient Panel */}
                <div className='hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center'>
                    {/* Abstract Shapes */}
                    <div className='absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-brand-600/40 to-cyan-600/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/3 opacity-70'></div>
                    <div className='absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 to-brand-600/30 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4 opacity-70'></div>
                    
                    {/* Glass Overlay Card */}
                    <div className='relative z-10 w-full max-w-lg p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl mx-12'>
                        <div className="bg-brand-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/30">
                            <Briefcase className="h-8 w-8 text-white" />
                        </div>
                        <h2 className='text-4xl font-extrabold text-white leading-tight mb-6'>
                            Unlock your career potential with NextHire.
                        </h2>
                        <p className="text-lg text-brand-100 font-medium leading-relaxed">
                            Join thousands of professionals who have found their dream jobs and top companies that have discovered exceptional talent.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup