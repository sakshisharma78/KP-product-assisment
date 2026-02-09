import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import FeedbackList from './components/FeedbackList';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={
                    <div className="py-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-8">Community Feedback</h1>
                        <FeedbackList />
                    </div>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
                    <AnimatedRoutes />
                </main>

                <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
                    <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} FeedbackFlow. All rights reserved.</p>
                        <div className="mt-2 space-x-4">
                            <a href="/admin" className="hover:text-brand-600 transition-colors">Admin Panel</a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
