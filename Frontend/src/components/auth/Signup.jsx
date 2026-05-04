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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Building2, Phone, Upload } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student", // Default role
        file: ""
    });
    const { loading: globalLoading, user } = useSelector(store => store.auth);
    const [localLoading, setLocalLoading] = useState(false);
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

        // Client-side validation
        if (!input.fullname.trim() || !input.email.trim() || !input.phoneNumber.trim() || !input.password.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("profilePhoto", input.file);
        }

        try {
            setLocalLoading(true);
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLocalLoading(false);
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
                                Create Account
                            </span>
                        </h1>
                        <p className='text-slate-400 mt-2'>Join us to explore amazing opportunities</p>
                    </div>

                    {/* Signup Form */}
                    <div className='p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10'>
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-slate-400">Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className='pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                                    />
                                </div>
                            </div>

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
                                <Label className="text-slate-400">Phone Number</Label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
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
                                        placeholder="Create a password"
                                        className='pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-400">Account Type</Label>
                                <RadioGroup 
                                    defaultValue="student"
                                    className="grid grid-cols-2 gap-4"
                                    value={input.role}
                                    onValueChange={(value) => setInput({ ...input, role: value })}
                                >
                                    <div className={`relative flex items-center justify-center p-4 rounded-lg border ${input.role === 'student' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'} cursor-pointer transition-all group`}>
                                        <RadioGroupItem value="student" className="absolute right-2 top-2 border-white/20" />
                                        <div className='text-center'>
                                            <User className={`h-6 w-6 mx-auto mb-2 ${input.role === 'student' ? 'text-blue-400' : 'text-slate-400'}`} />
                                            <span className={input.role === 'student' ? 'text-blue-400' : 'text-slate-400'}>Student</span>
                                        </div>
                                    </div>

                                    <div className={`relative flex items-center justify-center p-4 rounded-lg border ${input.role === 'recruiter' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'} cursor-pointer transition-all group`}>
                                        <RadioGroupItem value="recruiter" className="absolute right-2 top-2 border-white/20" />
                                        <div className='text-center'>
                                            <Building2 className={`h-6 w-6 mx-auto mb-2 ${input.role === 'recruiter' ? 'text-blue-400' : 'text-slate-400'}`} />
                                            <span className={input.role === 'recruiter' ? 'text-blue-400' : 'text-slate-400'}>Recruiter</span>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-slate-400">Profile Picture</Label>
                                <div className='relative'>
                                    <Upload className='absolute left-3 top-2.5 h-4 w-4 text-slate-400' />
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className='pl-10 bg-white/5 border-white/10 text-white file:bg-blue-500/20 file:text-blue-400 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-500/30 cursor-pointer'
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={localLoading}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
                            >
                                {localLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>

                            <p className='text-center text-slate-400'>
                                Already have an account?{' '}
                                <Link to="/login" className='text-blue-400 hover:text-blue-300 transition-colors'>
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup