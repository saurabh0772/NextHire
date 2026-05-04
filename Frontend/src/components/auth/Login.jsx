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
import { Loader2, Mail, Lock, User, Building2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student", // Default role
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
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8'>
                <div className='max-w-md mx-auto'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold'>
                            <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                                Welcome Back
                            </span>
                        </h1>
                        <p className='text-slate-400 mt-2'>Sign in to your account to continue</p>
                    </div>

                    {/* Login Form */}
                    <div className='p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10'>
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-slate-400">Email</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className='pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-400">Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-400">Account Type</Label>
                                <RadioGroup 
                                    name="role"
                                    className="grid grid-cols-2 gap-4"
                                    value={input.role}
                                    onValueChange={(value) => setInput(prev => ({ ...prev, role: value }))}
                                >
                                    <div className={`relative flex items-center justify-center p-4 rounded-lg border ${input.role === 'student' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'} cursor-pointer transition-all group`}>
                                        <RadioGroupItem value="student" id="student" className="absolute right-2 top-2 border-white/20" />
                                        <div className='text-center'>
                                            <User className={`h-6 w-6 mx-auto mb-2 ${input.role === 'student' ? 'text-blue-400' : 'text-slate-400'}`} />
                                            <span className={input.role === 'student' ? 'text-blue-400' : 'text-slate-400'}>Student</span>
                                        </div>
                                    </div>

                                    <div className={`relative flex items-center justify-center p-4 rounded-lg border ${input.role === 'recruiter' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'} cursor-pointer transition-all group`}>
                                        <RadioGroupItem value="recruiter" id="recruiter" className="absolute right-2 top-2 border-white/20" />
                                        <div className='text-center'>
                                            <Building2 className={`h-6 w-6 mx-auto mb-2 ${input.role === 'recruiter' ? 'text-blue-400' : 'text-slate-400'}`} />
                                            <span className={input.role === 'recruiter' ? 'text-blue-400' : 'text-slate-400'}>Recruiter</span>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || !input.email || !input.password}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>

                            <p className='text-center text-slate-400'>
                                Don't have an account?{' '}
                                <Link to="/signup" className='text-blue-400 hover:text-blue-300 transition-colors'>
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login