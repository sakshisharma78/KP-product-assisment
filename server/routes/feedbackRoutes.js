const express = require('express');
const router = express.Router();
const {
    createFeedback,
    getAllFeedbacks,
    deleteFeedback,
    updateStatus,
    getDashboardStats,
} = require('../controllers/feedbackController');

router.route('/').post(createFeedback);

// Admin routes (would typically be protected)
router.route('/').get(getAllFeedbacks);
router.route('/dashboard').get(getDashboardStats);
router.route('/:id').delete(deleteFeedback);
router.route('/:id').patch(updateStatus);

module.exports = router;
