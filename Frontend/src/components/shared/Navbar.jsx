import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
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
        return url; // Now we can directly use the Cloudinary URL
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
            toast.error(error.response.data.message);
        }
    }

    const isHomePage = location.pathname === '/';
    const navbarClass = `fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
    }`;

    return (
        <div className={navbarClass}>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <div>
                    <Link to="/">
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                            Job <span className='text-white'>Portal</span>
                        </h1>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button 
                    className='lg:hidden text-white hover:text-blue-400 transition-colors'
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-8'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/recruiter" className='text-slate-300 hover:text-blue-400 transition-colors'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/recruiter/companies" className='text-slate-300 hover:text-blue-400 transition-colors'>
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/recruiter/jobs" className='text-slate-300 hover:text-blue-400 transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className='text-slate-300 hover:text-blue-400 transition-colors'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className='text-slate-300 hover:text-blue-400 transition-colors'>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className='text-slate-300 hover:text-blue-400 transition-colors'>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-blue-500/50 hover:ring-blue-400 transition-all">
                                    <AvatarImage src={getProfilePhotoUrl(user?.profile?.profilePhoto)} alt={user?.fullname} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                                        {getInitials(user?.fullname)}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-slate-900 border border-white/10 shadow-2xl">
                                <div className='text-white'>
                                    <div className='flex gap-3 items-start'>
                                        <Avatar className="cursor-pointer ring-2 ring-blue-500/50">
                                            <AvatarImage src={getProfilePhotoUrl(user?.profile?.profilePhoto)} alt={user?.fullname} />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                                                {getInitials(user?.fullname)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-white'>{user?.fullname}</h4>
                                            <p className='text-sm text-slate-400'>{user?.profile?.bio || user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 mt-4'>
                                        {(user && (user.role === 'student' || user.role === 'recruiter')) && (
                                            <Link to="/profile" className='flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors'>
                                                <User2 className='text-blue-400' size={18} />
                                                <span>View Profile</span>
                                            </Link>
                                        )}
                                        <button 
                                            onClick={logoutHandler}
                                            className='flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-red-400'
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className='lg:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10'>
                        <div className='p-4'>
                            <ul className='flex flex-col gap-4'>
                                {user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link 
                                                to="/recruiter" 
                                                className='text-slate-300 hover:text-blue-400 transition-colors block'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/recruiter/companies" 
                                                className='text-slate-300 hover:text-blue-400 transition-colors block'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/recruiter/jobs" 
                                                className='text-slate-300 hover:text-blue-400 transition-colors block'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link 
                                                to="/" 
                                                className='text-slate-300 hover:text-blue-400 transition-colors block'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/jobs" 
                                                className='text-slate-300 hover:text-blue-400 transition-colors block'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                to="/browse" 
                                                className='text-slate-300 hover:text-blue-400 transition-colors block'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>

                            {user && (
                                <div className='mt-4 pt-4 border-t border-white/10'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className="ring-2 ring-blue-500/50">
                                            <AvatarImage src={getProfilePhotoUrl(user?.profile?.profilePhoto)} alt={user?.fullname} />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                                                {getInitials(user?.fullname)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-white'>{user?.fullname}</h4>
                                            <p className='text-sm text-slate-400'>{user?.profile?.bio || user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 mt-4'>
                                        {(user.role === 'student' || user.role === 'recruiter') && (
                                            <Link 
                                                to="/profile" 
                                                className='flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-300'
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <User2 className='text-blue-400' size={18} />
                                                <span>View Profile</span>
                                            </Link>
                                        )}
                                        <button 
                                            onClick={() => {
                                                logoutHandler();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className='flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-red-400'
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!user && (
                                <div className='mt-4 pt-4 border-t border-white/10 flex flex-col gap-3'>
                                    <Link 
                                        to="/login" 
                                        className='text-slate-300 hover:text-blue-400 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/signup" 
                                        className='text-slate-300 hover:text-blue-400 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Signup
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
