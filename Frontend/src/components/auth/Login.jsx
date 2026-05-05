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
import { Loader2, Mail, Lock, User, Building2, Quote } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
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
                <div className='flex-1 flex items-center justify-center p-8 lg:p-24 w-full lg:w-1/2'>
                    <div className='w-full max-w-md'>
                        <div className='mb-10 text-center lg:text-left'>
                            <h1 className='text-3xl font-extrabold text-slate-900 dark:text-white mb-2'>
                                Welcome Back
                            </h1>
                            <p className='text-slate-500 font-medium'>Please enter your details to sign in.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Email address</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-3 h-5 w-5 text-slate-400' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your password"
                                        className='pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500 rounded-xl transition-all'
                                    />
                                </div>
                            </div>

                            <div className='space-y-3 pt-2'>
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">I am a...</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div 
                                        onClick={() => setInput(prev => ({ ...prev, role: 'student' }))}
                                        className={`relative flex items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer ${input.role === 'student' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                        <div className='text-center'>
                                            <User className={`h-6 w-6 mx-auto mb-2 ${input.role === 'student' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                                            <span className={`font-semibold ${input.role === 'student' ? 'text-brand-700 dark:text-brand-300' : 'text-slate-500'}`}>Candidate</span>
                                        </div>
                                    </div>

                                    <div 
                                        onClick={() => setInput(prev => ({ ...prev, role: 'recruiter' }))}
                                        className={`relative flex items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer ${input.role === 'recruiter' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                        <div className='text-center'>
                                            <Building2 className={`h-6 w-6 mx-auto mb-2 ${input.role === 'recruiter' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                                            <span className={`font-semibold ${input.role === 'recruiter' ? 'text-brand-700 dark:text-brand-300' : 'text-slate-500'}`}>Recruiter</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || !input.email || !input.password}
                                className="w-full h-12 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all shadow-md shadow-brand-500/20 hover:-translate-y-0.5 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Authenticating...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            <p className='text-center text-sm font-medium text-slate-500 pt-4'>
                                Don't have an account?{' '}
                                <Link to="/signup" className='text-brand-600 dark:text-brand-400 hover:underline'>
                                    Create one now
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Right Side: Image/Gradient Panel */}
                <div className='hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden items-center justify-center'>
                    {/* Abstract Shapes */}
                    <div className='absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-600/40 to-violet-600/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70'></div>
                    <div className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/30 to-brand-600/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70'></div>
                    
                    {/* Glass Overlay Card */}
                    <div className='relative z-10 w-full max-w-lg p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl mx-12'>
                        <Quote className='h-12 w-12 text-brand-300 mb-6 opacity-80' />
                        <h2 className='text-3xl font-bold text-white leading-tight mb-6'>
                            "NextHire completely transformed how we discover top tier talent. The platform is intuitive, fast, and incredibly effective."
                        </h2>
                        <div className='flex items-center gap-4'>
                            <div className='h-12 w-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-lg'>
                                SJ
                            </div>
                            <div>
                                <p className='text-white font-bold'>Sarah Jenkins</p>
                                <p className='text-brand-200 text-sm'>HR Director at TechFlow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login