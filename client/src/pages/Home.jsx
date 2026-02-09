import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="py-12 space-y-12">
            <div className="text-center space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
                >
                    We Want to Hear From <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">You</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600 max-w-2xl mx-auto"
                >
                    Your feedback helps us build better products and experiences.
                    Share your thoughts with us below.
                </motion.p>
            </div>

            <FeedbackForm />
        </div>
    );
};

export default Home;
