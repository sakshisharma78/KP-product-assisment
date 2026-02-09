import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, Eye, X, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminPanel = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const fetchFeedbacks = async () => {
        try {
            const res = await api.get('/feedbacks');
            if (res.data.success) {
                setFeedbacks(res.data.data);
            }
        } catch (error) {
            toast.error('Failed to load feedbacks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this feedback?')) return;

        try {
            await api.delete(`/feedbacks/${id}`);
            setFeedbacks(feedbacks.filter(f => f._id !== id));
            toast.success('Feedback deleted successfully');
        } catch (error) {
            toast.error('Error deleting feedback');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/feedbacks/${id}`, { status: newStatus });
            setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, status: newStatus } : f));
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-brand-600" size={32} />
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Feedback Management</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                                <th className="p-4 font-semibold">User</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Rating</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {feedbacks.map((fb) => (
                                <tr key={fb._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">{fb.name}</div>
                                        <div className="text-xs text-slate-500">{fb.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium 
                                            ${fb.category === 'Product' ? 'bg-indigo-100 text-indigo-700' :
                                                fb.category === 'Service' ? 'bg-emerald-100 text-emerald-700' :
                                                    'bg-amber-100 text-amber-700'}`}>
                                            {fb.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600">{fb.rating} / 5</td>
                                    <td className="p-4">
                                        <select
                                            value={fb.status}
                                            onChange={(e) => handleStatusChange(fb._id, e.target.value)}
                                            className={`text-xs font-medium rounded px-2 py-1 border-0 focus:ring-2 focus:ring-brand-500 cursor-pointer
                                                ${fb.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                    fb.status === 'Read' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-green-100 text-green-700'}`}
                                        >
                                            <option value="New">New</option>
                                            <option value="Read">Read</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">
                                        {new Date(fb.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => setSelectedFeedback(fb)}
                                            className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(fb._id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {feedbacks.length === 0 && (
                        <div className="p-8 text-center text-slate-500">No feedbacks found.</div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFeedback(null)} // Close on background click
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-bold text-lg text-slate-800">Feedback Details</h3>
                                <button onClick={() => setSelectedFeedback(null)} className="text-slate-400 hover:text-slate-600">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-semibold">Name</label>
                                        <p className="text-slate-800 font-medium">{selectedFeedback.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-semibold">Email</label>
                                        <p className="text-slate-800 font-medium">{selectedFeedback.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-semibold">Category</label>
                                        <p className="text-slate-800 font-medium">{selectedFeedback.category}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-semibold">Rating</label>
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < selectedFeedback.rating ? "currentColor" : "none"} className={i < selectedFeedback.rating ? "" : "text-slate-300"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 uppercase font-semibold">Message</label>
                                    <div className="mt-2 p-4 bg-slate-50 rounded-lg text-slate-700 leading-relaxed border border-slate-100">
                                        {selectedFeedback.message}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => setSelectedFeedback(null)}
                                        className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete(selectedFeedback._id);
                                            setSelectedFeedback(null);
                                        }}
                                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 font-medium"
                                    >
                                        Delete Item
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
