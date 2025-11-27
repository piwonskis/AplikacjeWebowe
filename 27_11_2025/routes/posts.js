const express = require('express');
const router = express.Router();
const prisma = require('../db');


router.post('/', async (req, res) => {
    const { tytul, zawartosc, id_kategorii, tworca } = req.body;
    try {
        const wpis = await prisma.wpis.create({
            data: { tytul, zawartosc, id_kategorii, tworca },
        });
        res.json(wpis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const wpisy = await prisma.wpis.findMany({ include: { kategoria: true, komentarzs: true } });
        res.json(wpisy);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const wpis = await prisma.wpis.findUnique({
            where: { id },
            include: { kategoria: true, komentarzs: true },
        });
        res.json(wpis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { tytul, zawartosc, id_kategorii, tworca } = req.body;
    try {
        const wpis = await prisma.wpis.update({
            where: { id },
            data: { tytul, zawartosc, id_kategorii, tworca },
        });
        res.json(wpis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.wpis.delete({ where: { id } });
        res.json({ message: 'Wpis usunięty' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
