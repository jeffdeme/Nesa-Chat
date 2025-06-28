const express = require('express');
const router = express.Router();
const prisma = require('./dbClient');

// Get all votes
router.get('/', async (req, res) => {
    try {
        const votes = await prisma.vote.findMany();
        res.json(votes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch votes' });
    }
});

// Get a single vote by ID
router.get('/:id', async (req, res) => {
    try {
        const vote = await prisma.vote.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!vote) return res.status(404).json({ error: 'Vote not found' });
        res.json(vote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vote' });
    }
});

// Create a new vote
router.post('/', async (req, res) => {
    try {
        const { option, count, pollId } = req.body;
        const vote = await prisma.vote.create({
            data: { option, count, pollId }
        });
        res.status(201).json(vote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vote' });
    }
});

// Update a vote
router.put('/:id', async (req, res) => {
    try {
        const { option, count, pollId } = req.body;
        const vote = await prisma.vote.update({
            where: { id: parseInt(req.params.id) },
            data: { option, count, pollId }
        });
        res.json(vote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vote' });
    }
});

// Delete a vote
router.delete('/:id', async (req, res) => {
    try {
        await prisma.vote.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete vote' });
    }
});

module.exports = router;
