import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, User, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const FeedbackCard = ({ feedback, index }) => {
    const categoryColors = {
        Product: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        Service: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        Support: 'bg-amber-100 text-amber-700 border-amber-200',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                        {feedback.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">{feedback.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock size={12} />
                            {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                        </div>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[feedback.category] || 'bg-slate-100 text-slate-600'}`}>
                    {feedback.category}
                </span>
            </div>

            <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={`${i < feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                ))}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {feedback.message}
            </p>

            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-2">

                </div>
                {/* Could add like/reply buttons here later */}
            </div>
        </motion.div>
    );
};

export default FeedbackCard;
