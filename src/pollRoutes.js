const express = require('express');
const router = express.Router();
const prisma = require('./dbClient');

// Get all polls
router.get('/', async (req, res) => {
    try {
        const polls = await prisma.poll.findMany({ include: { votes: true } });
        res.json(polls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
});

// Get a single poll by ID
router.get('/:id', async (req, res) => {
    try {
        const poll = await prisma.poll.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { votes: true }
        });
        if (!poll) return res.status(404).json({ error: 'Poll not found' });
        res.json(poll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch poll' });
    }
});

// Create a new poll
router.post('/', async (req, res) => {
    try {
        const { room, question } = req.body;
        const poll = await prisma.poll.create({
            data: { room, question }
        });
        res.status(201).json(poll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create poll' });
    }
});

// Update a poll
router.put('/:id', async (req, res) => {
    try {
        const { room, question } = req.body;
        const poll = await prisma.poll.update({
            where: { id: parseInt(req.params.id) },
            data: { room, question }
        });
        res.json(poll);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update poll' });
    }
});

// Delete a poll
router.delete('/:id', async (req, res) => {
    try {
        await prisma.poll.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete poll' });
    }
});

// Get all votes for a poll
router.get('/:id/votes', async (req, res) => {
    try {
        const votes = await prisma.vote.findMany({
            where: { pollId: parseInt(req.params.id) }
        });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch votes for poll' });
    }
});

module.exports = router;
