import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquarePlus, LayoutDashboard, ListFilter, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Submit Feedback', path: '/', icon: <MessageSquarePlus size={20} /> },
        { name: 'Live Feed', path: '/feed', icon: <ListFilter size={20} /> },
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-tr from-brand-600 to-purple-600 p-2 rounded-lg text-white group-hover:shadow-lg transition-all duration-300">
                            <Star size={24} fill="white" className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                            Feedback<span className="text-brand-600">Flow</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex space-x-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors ${isActive
                                            ? 'text-brand-700'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-brand-50 rounded-full border border-brand-100"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {item.icon}
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
