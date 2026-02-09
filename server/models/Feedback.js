const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxLength: [50, 'Name cannot be more than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        rating: {
            type: Number,
            required: [true, 'Please provide a rating'],
            min: 1,
            max: 5,
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: ['Product', 'Service', 'Support'],
        },
        message: {
            type: String,
            required: [true, 'Please provide your feedback message'],
            maxLength: [500, 'Message cannot be more than 500 characters'],
        },
        status: {
            type: String,
            enum: ['New', 'Read', 'Resolved'],
            default: 'New',
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Add text index for search
feedbackSchema.index({ name: 'text', email: 'text', message: 'text' });

module.exports = mongoose.model('Feedback', feedbackSchema);
