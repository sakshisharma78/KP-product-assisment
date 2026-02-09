import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 0,
        category: 'Product',
        message: '',
    });

    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});

    const categories = [
        { id: 'Product', label: 'Product Quality', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
        { id: 'Service', label: 'Customer Service', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { id: 'Support', label: 'Technical Support', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    ];

    const handleRating = (r) => setFormData({ ...formData, rating: r });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const getFieldError = (field) => {
        if (!touched[field]) return '';
        if (field === 'email' && !validateEmail(formData.email)) return 'Please enter a valid email address';
        if (field === 'rating' && formData.rating === 0) return 'Please provide a rating';
        if ((field === 'name' || field === 'message') && !formData[field].trim()) return 'This field is required';
        return '';
    };

    const isFormValid = () => {
        return (
            formData.name.trim() &&
            validateEmail(formData.email) &&
            formData.rating > 0 &&
            formData.message.trim()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, rating: true, message: true });

        if (!isFormValid()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post('/feedbacks', formData);
            toast.success('Thank you for your feedback!', {
                icon: <CheckCircle2 className="text-brand-500" />,
            });
            setFormData({
                name: '',
                email: '',
                rating: 0,
                category: 'Product',
                message: '',
            });
            setTouched({});
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
        >
            <div className="bg-gradient-to-r from-brand-600 to-purple-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Star size={120} />
                </div>
                <h2 className="text-3xl font-bold mb-2 relative z-10">We Value Your Opinion</h2>
                <p className="text-brand-50 relative z-10">Help us improve our products and services.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onBlur={() => setTouched({ ...touched, name: true })}
                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${getFieldError('name')
                                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                                    : 'border-slate-200 focus:ring-brand-200 focus:border-brand-400 bg-slate-50 focus:bg-white'
                                    }`}
                            />
                            <AnimatePresence>
                                {getFieldError('name') && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute right-3 top-3 text-red-500"
                                    >
                                        <AlertCircle size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => setTouched({ ...touched, email: true })}
                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${getFieldError('email')
                                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                                    : 'border-slate-200 focus:ring-brand-200 focus:border-brand-400 bg-slate-50 focus:bg-white'
                                    }`}
                            />
                        </div>
                        {getFieldError('email') && (
                            <p className="text-xs text-red-500 mt-1">{getFieldError('email')}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">How would you rate your experience?</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => handleRating(star)}
                                className="focus:outline-none"
                            >
                                <Star
                                    size={32}
                                    className={`transition-colors duration-200 ${star <= (hoverRating || formData.rating)
                                        ? 'fill-amber-400 text-amber-400 drop-shadow-md'
                                        : 'text-slate-300'
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                    {touched.rating && formData.rating === 0 && (
                        <p className="text-xs text-red-500">Please select a star rating</p>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Feedback Category</label>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, category: cat.id })}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${formData.category === cat.id
                                    ? `${cat.color} ring-2 ring-offset-1 ring-${cat.color.split('-')[1]}-300 shadow-sm`
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Your Feedback</label>
                    <textarea
                        rows="4"
                        placeholder="Tell us what you think..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onBlur={() => setTouched({ ...touched, message: true })}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all resize-none ${getFieldError('message')
                            ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                            : 'border-slate-200 focus:ring-brand-200 focus:border-brand-400 bg-slate-50 focus:bg-white'
                            }`}
                    ></textarea>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-brand-200 flex items-center justify-center gap-2 transition-all ${isSubmitting
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-brand-600 to-purple-600 hover:shadow-xl hover:shadow-brand-300'
                        }`}
                >
                    {isSubmitting ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                    ) : (
                        <>
                            Submit Feedback <Send size={18} />
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default FeedbackForm;
