import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

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
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Job <span className="text-white">Portal</span>
              </h2>
              <p className="mt-2 text-slate-300">
                Your gateway to endless career opportunities. Connect with top companies and take the next step in your professional journey.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={16} className="text-blue-400" />
                <span>contact@jobportal.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={16} className="text-blue-400" />
                <span>+91 9310368150</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={16} className="text-blue-400" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/browse?category=${category}`}
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-300 mb-4">Subscribe to our newsletter for the latest job updates.</p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/30">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-300 text-sm">
              © 2024 JobPortal. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;