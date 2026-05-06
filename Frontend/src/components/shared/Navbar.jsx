import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X, LayoutDashboard, Briefcase, Building2, BarChart2 } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get profile photo URL
    const getProfilePhotoUrl = (url) => {
        if (!url) return null;
        return url;
    };

    // Get user initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase();
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const isHomePage = location.pathname === '/';
    const navbarClass = `fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
            ? 'glass border-b'
            : 'bg-transparent py-2'
    }`;

    return (
        <div className={navbarClass}>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                            <Briefcase size={20} strokeWidth={2.5} />
                        </div>
                        <h1 className='text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white'>
                            Next<span className='text-brand-600 dark:text-brand-400'>Hire</span>
                        </h1>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button 
                    className='lg:hidden text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-colors'
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-8 text-sm'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/recruiter" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5'>
                                        <LayoutDashboard size={16} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/recruiter/companies" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5'>
                                        <Building2 size={16} /> Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/recruiter/jobs" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5'>
                                        <Briefcase size={16} /> Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/recruiter/analytics" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5'>
                                        <BarChart2 size={16} /> Analytics
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className='text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors'>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md shadow-brand-500/20 hover:-translate-y-0.5 transition-all font-medium px-6">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-brand-500/50 transition-all">
                                    <AvatarImage src={getProfilePhotoUrl(user?.profile?.profilePhoto)} alt={user?.fullname} className="object-cover" />
                                    <AvatarFallback className="bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-bold">
                                        {getInitials(user?.fullname)}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0 overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl mr-4 mt-2">
                                <div className='bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-100 dark:border-slate-800'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-slate-800 shadow-sm">
                                            <AvatarImage src={getProfilePhotoUrl(user?.profile?.profilePhoto)} alt={user?.fullname} className="object-cover" />
                                            <AvatarFallback className="bg-brand-100 text-brand-700 font-bold">
                                                {getInitials(user?.fullname)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-bold text-slate-900 dark:text-white leading-tight'>{user?.fullname}</h4>
                                            <p className='text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[180px]'>
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-2 flex flex-col'>
                                    {(user && (user.role === 'student' || user.role === 'recruiter')) && (
                                        <Link to="/profile" className='flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-200 font-medium text-sm'>
                                            <User2 className='text-brand-500' size={18} />
                                            <span>View Profile</span>
                                        </Link>
                                    )}
                                    <button 
                                        onClick={logoutHandler}
                                        className='flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-red-600 dark:text-red-400 font-medium text-sm w-full text-left'
                                    >
                                        <LogOut size={18} />
                                        <span>Log out</span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className='lg:hidden absolute top-full left-0 right-0 glass border-b shadow-lg animate-in slide-in-from-top-2'>
                        <div className='p-4 space-y-4'>
                            <ul className='flex flex-col gap-2 font-medium'>
                                {user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link 
                                                to="/recruiter" 
                                                className='flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <LayoutDashboard size={18} className="text-brand-500" /> Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/recruiter/companies" 
                                                className='flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Building2 size={18} className="text-brand-500" /> Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/recruiter/jobs" 
                                                className='flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Briefcase size={18} className="text-brand-500" /> Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/recruiter/analytics" 
                                                className='flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <BarChart2 size={18} className="text-brand-500" /> Analytics
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link 
                                                to="/" 
                                                className='block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/jobs" 
                                                className='block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/browse" 
                                                className='block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>

                            {user ? (
                                <div className='pt-4 border-t border-slate-200 dark:border-slate-800'>
                                    <div className='flex items-center gap-3 p-2'>
                                        <Avatar className="ring-2 ring-slate-100 dark:ring-slate-800">
                                            <AvatarImage src={getProfilePhotoUrl(user?.profile?.profilePhoto)} alt={user?.fullname} className="object-cover" />
                                            <AvatarFallback className="bg-brand-100 text-brand-700 font-bold">
                                                {getInitials(user?.fullname)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-bold text-slate-900 dark:text-white'>{user?.fullname}</h4>
                                            <p className='text-xs text-slate-500 dark:text-slate-400'>{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 mt-2'>
                                        <Link 
                                            to="/profile" 
                                            className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <User2 className='text-brand-500' size={18} />
                                            <span>View Profile</span>
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                logoutHandler();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className='flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 font-medium w-full text-left'
                                        >
                                            <LogOut size={18} />
                                            <span>Log out</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3'>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center h-12 rounded-xl text-slate-700 dark:text-slate-300 font-medium">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full justify-center h-12 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
