const express = require('express');
const router = express.Router();
const prisma = require('./dbClient');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.update({
            where: { id: parseInt(req.params.id) },
            data: { name }
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        await prisma.category.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;
