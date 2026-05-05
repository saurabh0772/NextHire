import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Find Jobs', href: '/jobs' },
    { name: 'Browse Companies', href: '/browse' },
    { name: 'Post a Job', href: '/admin/jobs/create' },
    { name: 'Contact Us', href: '#' },
  ];

  const categories = [
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Data Science',
    'Digital Marketing',
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group inline-block">
              <div className="bg-brand-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Next<span className="text-brand-600 dark:text-brand-400">Hire</span>
              </h2>
            </Link>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
              Your gateway to endless career opportunities. Connect with top companies and take the next step in your professional journey.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-600 dark:text-brand-400" />
                </div>
                <span>krsaurabh0772@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-brand-600 dark:text-brand-400" />
                </div>
                <span>+91 9310368150</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-600 dark:text-brand-400" />
                </div>
                <span>Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-500 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Job Categories</h3>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/browse?category=${category}`}
                    className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-500 transition-colors"></span>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Newsletter</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Subscribe to our newsletter for the latest job updates and career tips.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
              />
              <button className="w-full px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition-all shadow-md shadow-brand-500/20 hover:-translate-y-0.5">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-800 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} NextHire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:text-brand-400 dark:hover:bg-brand-900/20 transition-all border border-slate-200 dark:border-slate-800"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;