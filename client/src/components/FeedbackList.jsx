import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import FeedbackCard from './FeedbackCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Filter, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        rating: 0,
        category: 'All',
        search: '',
    });

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/feedbacks');
            if (res.data.success) {
                setFeedbacks(res.data.data);
                setFilteredFeedbacks(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to load feedbacks');
            setLoading(false);
            toast.error('Could not load feedbacks');
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    useEffect(() => {
        let result = feedbacks;

        if (filters.rating > 0) {
            result = result.filter((f) => f.rating === filters.rating);
        }

        if (filters.category !== 'All') {
            result = result.filter((f) => f.category === filters.category);
        }

        if (filters.search) {
            const term = filters.search.toLowerCase();
            result = result.filter(
                (f) =>
                    f.name.toLowerCase().includes(term) ||
                    f.email.toLowerCase().includes(term) ||
                    f.message.toLowerCase().includes(term)
            );
        }

        setFilteredFeedbacks(result);
    }, [filters, feedbacks]);

    const handleReset = () => {
        setFilters({ rating: 0, category: 'All', search: '' });
    };

    const categories = ['All', 'Product', 'Service', 'Support'];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-brand-600" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-red-500">
                <AlertCircle size={48} className="mb-4" />
                <p>{error}</p>
                <button
                    onClick={fetchFeedbacks}
                    className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Filters Bar */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"
            >
                <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or content..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilters({ ...filters, category: cat })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filters.category === cat
                                    ? 'bg-brand-100 text-brand-700 border border-brand-200'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <select
                        value={filters.rating}
                        onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                        className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-sm"
                    >
                        <option value={0}>All Ratings</option>
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                    </select>
                </div>

                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium whitespace-nowrap"
                >
                    <RotateCcw size={16} />
                    Reset Filters
                </button>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredFeedbacks.length > 0 ? (
                        filteredFeedbacks.map((feedback, index) => (
                            <FeedbackCard key={feedback._id} feedback={feedback} index={index} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="col-span-full py-20 text-center text-slate-500"
                        >
                            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                                <Filter size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-700">No feedbacks found</h3>
                            <p>Try adjusting your filters or search query.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FeedbackList;
