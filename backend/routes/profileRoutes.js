const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Save Student Profile
router.put('/', authMiddleware, async (req, res) => {
    try {
        const { education, skills, interests } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                education,
                skills,
                interests
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Profile saved successfully!',
            user
        });

    } catch (error) {
        res.status(500).json({
            message: 'Profile update failed',
            error: error.message
        });
    }
});

// Get Student Profile
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: 'Unable to fetch profile',
            error: error.message
        });
    }
});

module.exports = router;