const Feedback = require('../models/Feedback');

// @desc    Create new feedback
// @route   POST /api/feedbacks
// @access  Public
exports.createFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json({
            success: true,
            data: feedback,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all feedbacks with filtering and sorting
// @route   GET /api/feedbacks
// @access  Private (Admin)
exports.getAllFeedbacks = async (req, res) => {
    try {
        let query;

        const reqQuery = { ...req.query };

        // Fields to exclude from filtering
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach((param) => delete reqQuery[param]);

        // Create query string for advanced filtering
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

        // Basic query
        query = Feedback.find(JSON.parse(queryStr));

        // Search functionality using text index
        if (req.query.search) {
            query = query.find({ $text: { $search: req.query.search } });
        }

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Execution
        const feedbacks = await query;

        res.status(200).json({
            success: true,
            count: feedbacks.length,
            data: feedbacks,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update feedback status
// @route   PATCH /api/feedbacks/:id
// @access  Private (Admin)
exports.updateStatus = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }

        res.status(200).json({ success: true, data: feedback });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete feedback
// @route   DELETE /api/feedbacks/:id
// @access  Private (Admin)
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);

        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
    try {
        const totalCount = await Feedback.countDocuments();

        // Average rating
        const avgRatingAgg = await Feedback.aggregate([
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$rating' },
                },
            },
        ]);
        const avgRating = avgRatingAgg.length > 0 ? avgRatingAgg[0].avgRating.toFixed(1) : 0;

        // Category breakdown
        const categoryBreakdown = await Feedback.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Recent feedbacks
        const recentFeedbacks = await Feedback.find().sort('-createdAt').limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalCount,
                avgRating,
                categoryBreakdown,
                recentFeedbacks,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
