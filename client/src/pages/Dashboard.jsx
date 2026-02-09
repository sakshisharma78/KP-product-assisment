import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import api from '../api/axios';
import { Users, Star, MessageSquare, TrendingUp } from 'lucide-react';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/feedbacks/dashboard'); // Wait, route was /api/feedbacks/dashboard
                // Check router:
                // app.use('/api/feedbacks', feedbackRoutes);
                // router.route('/dashboard').get(...)
                // So URL is /api/feedbacks/dashboard
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    if (!stats) return <div className="text-center py-20">No data available</div>;

    const pieData = {
        labels: stats.categoryBreakdown.map((item) => item._id),
        datasets: [
            {
                data: stats.categoryBreakdown.map((item) => item.count),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.6)', // Indigo - Product
                    'rgba(16, 185, 129, 0.6)', // Emerald - Service
                    'rgba(245, 158, 11, 0.6)', // Amber - Support
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="space-y-8 p-6">
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-slate-800"
            >
                Analytics Dashboard
            </motion.h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between"
                >
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Feedbacks</p>
                        <p className="text-3xl font-bold text-slate-800">{stats.totalCount}</p>
                    </div>
                    <div className="p-3 bg-brand-50 rounded-full text-brand-600">
                        <MessageSquare size={24} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between"
                >
                    <div>
                        <p className="text-sm font-medium text-slate-500">Average Rating</p>
                        <p className="text-3xl font-bold text-slate-800">{stats.avgRating}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
                        <Star size={24} fill="currentColor" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between"
                >
                    {/* Placeholder for now, maybe user satifaction? */}
                    <div>
                        <p className="text-sm font-medium text-slate-500">Response Rate</p>
                        <p className="text-3xl font-bold text-slate-800">98%</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                        <TrendingUp size={24} />
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                >
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Feedback by Category</h3>
                    <div className="w-full max-w-xs mx-auto">
                        <Pie data={pieData} />
                    </div>
                </motion.div>

                {/* Recent Feedbacks */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                >
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {stats.recentFeedbacks.map((fb) => (
                            <div key={fb._id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                                    {fb.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{fb.name}</p>
                                    <p className="text-xs text-slate-500 truncate max-w-[200px]">{fb.message}</p>
                                </div>
                                <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                                    {new Date(fb.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
