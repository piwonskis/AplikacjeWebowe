const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.post('/', async (req, res) => {
    const { nazwa, opis_kategorii } = req.body;
    try {
        const kategoria = await prisma.kategoria.create({
            data: { nazwa, opis_kategorii },
        });
        res.json(kategoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const kategorie = await prisma.kategoria.findMany({ include: { wpis: true } });
        res.json(kategorie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const kategoria = await prisma.kategoria.findUnique({
            where: { id },
            include: { wpis: true },
        });
        res.json(kategoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nazwa, opis_kategorii } = req.body;
    try {
        const kategoria = await prisma.kategoria.update({
            where: { id },
            data: { nazwa, opis_kategorii },
        });
        res.json(kategoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.kategoria.delete({ where: { id } });
        res.json({ message: 'Kategoria usunięta' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
