
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const careerData = [
    {
        title: 'Software Developer',
        description: 'Develop software applications using programming languages.',
        skills: ['Java', 'Python', 'JavaScript', 'Problem Solving'],
        skillKeywords: ['java', 'python', 'javascript', 'c++', 'programming'],
        interestKeywords: ['software', 'programming', 'application development']
    },
    {
        title: 'Frontend Developer',
        description: 'Design and develop attractive and interactive websites.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        skillKeywords: ['html', 'css', 'javascript', 'react', 'web development'],
        interestKeywords: ['web development', 'frontend', 'website design']
    },
    {
        title: 'Database Developer',
        description: 'Manage, design and maintain databases.',
        skills: ['SQL', 'MongoDB', 'Database Management'],
        skillKeywords: ['sql', 'mongodb', 'mysql', 'database'],
        interestKeywords: ['database', 'data management', 'data analysis', 'analytics']
    },
    {
        title: 'Software Tester',
        description: 'Test software applications and identify defects.',
        skills: ['Manual Testing', 'Selenium', 'SQL'],
        skillKeywords: ['testing', 'selenium', 'manual testing', 'automation testing'],
        interestKeywords: ['testing', 'software quality', 'quality assurance']
    },
    {
        title: 'Machine Learning Engineer',
        description: 'Build intelligent systems using data and machine learning.',
        skills: ['Python', 'Machine Learning', 'Statistics'],
        skillKeywords: ['python', 'machine learning', 'tensorflow', 'pytorch'],
        interestKeywords: [
            'artificial intelligence',
            'ai',
            'machine learning',
            'data science',
            'data analysis',
            'analytics'
        ]
    },
    {
        title: 'Data Analyst',
        description: 'Analyze data and generate useful insights for decision-making.',
        skills: ['Python', 'SQL', 'Data Analysis', 'Statistics'],
        skillKeywords: ['python', 'sql', 'data analysis', 'excel', 'statistics'],
        interestKeywords: ['data science', 'data analysis', 'analytics', 'artificial intelligence']
    },
    {
        title: 'AI Engineer',
        description: 'Develop intelligent applications using artificial intelligence.',
        skills: ['Python', 'Machine Learning', 'Deep Learning'],
        skillKeywords: ['python', 'machine learning', 'deep learning', 'tensorflow'],
        interestKeywords: ['artificial intelligence', 'ai', 'machine learning', 'data science']
    }
];

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User profile not found'
            });
        }

        const skills = (user.skills || []).map(item =>
            String(item).trim().toLowerCase()
        );

        const interests = (user.interests || []).map(item =>
            String(item).trim().toLowerCase()
        );

        console.log('PROFILE SKILLS:', skills);
        console.log('PROFILE INTERESTS:', interests);

        const recommendations = careerData.map(career => {

            const matchedSkills = skills.filter(skill =>
                career.skillKeywords.some(keyword =>
                    skill === keyword ||
                    skill.includes(keyword) ||
                    keyword.includes(skill)
                )
            );

            const matchedInterests = interests.filter(interest =>
                career.interestKeywords.some(keyword =>
                    interest === keyword ||
                    interest.includes(keyword) ||
                    keyword.includes(interest)
                )
            );

            const skillScore =
                (matchedSkills.length / career.skills.length) * 70;

            const interestScore =
                Math.min(matchedInterests.length * 15, 30);

            const matchScore = Math.min(
                Math.round(skillScore + interestScore),
                100
            );

            return {
                title: career.title,
                description: career.description,
                requiredSkills: career.skills,
                matchedSkills,
                matchedInterests,
                matchScore,
                reason:
                    matchedSkills.length > 0 || matchedInterests.length > 0
                        ? 'This career matches your technical skills and career interests.'
                        : 'Learn the required skills to explore this career.'
            };
        });

        const filteredRecommendations = recommendations
            .filter(career => career.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);

        console.log('CAREER RESULTS:', filteredRecommendations);

        res.json({
            message: 'Career recommendations generated successfully',
            recommendations: filteredRecommendations
        });

    } catch (error) {
        console.error('Career recommendation error:', error);

        res.status(500).json({
            message: 'Error generating career recommendations',
            error: error.message
        });
    }
});

module.exports = router;
