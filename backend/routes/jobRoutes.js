const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get All Jobs
router.get('/', authMiddleware, async (req, res) => {
    try {
        const jobs = await Job.find();

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            message: 'Unable to fetch jobs',
            error: error.message
        });
    }
});

// Recommend Jobs Based on Student Skills
router.get('/recommend/:studentId', authMiddleware, async (req, res) => {
    try {
        if (req.user.id !== req.params.studentId) {
            return res.status(403).json({
                message: 'You cannot access another student profile'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const studentSkills = (user.skills || []).map(skill =>
            skill.toLowerCase()
        );

        const jobs = await Job.find();

        const recommendedJobs = jobs.map(job => {
            const matchedSkills = job.skills.filter(skill =>
                studentSkills.includes(skill.toLowerCase())
            );

            const matchPercentage = job.skills.length
                ? Math.round(
                    (matchedSkills.length / job.skills.length) * 100
                )
                : 0;

            return {
                ...job.toObject(),
                matchedSkills,
                matchPercentage
            };
        })
        .filter(job => job.matchPercentage > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.json({
            message: recommendedJobs.length
                ? 'Job recommendations generated successfully'
                : 'No matching jobs found. Add more skills to your profile.',
            jobs: recommendedJobs
        });

    } catch (error) {
        res.status(500).json({
            message: 'Unable to recommend jobs',
            error: error.message
        });
    }
});

module.exports = router;