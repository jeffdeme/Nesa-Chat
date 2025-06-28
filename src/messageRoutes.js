const express = require('express');
const router = express.Router();
const prisma = require('./dbClient');

// Get all messages (optionally filter by room)
router.get('/', async (req, res) => {
    try {
        const { room } = req.query;
        const messages = await prisma.message.findMany({
            where: room ? { room } : undefined
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Get a single message by ID
router.get('/:id', async (req, res) => {
    try {
        const message = await prisma.message.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!message) return res.status(404).json({ error: 'Message not found' });
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch message' });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    try {
        const { room, username, userId, text } = req.body;
        const message = await prisma.message.create({
            data: { room, username, userId, text }
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
    }
});

// Update a message
router.put('/:id', async (req, res) => {
    try {
        const { room, username, userId, text } = req.body;
        const message = await prisma.message.update({
            where: { id: parseInt(req.params.id) },
            data: { room, username, userId, text }
        });
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
    }
});

// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        await prisma.message.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

module.exports = router;
