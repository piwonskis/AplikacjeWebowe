const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.post('/', async (req, res, next) => {
    const { tytul, zawartosc, id_kategorii, tworca } = req.body;
    try {
        const wpis = await prisma.wpis.create({
            data: { tytul, zawartosc, id_kategorii, tworca },
        });
        res.json(wpis);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const wpisy = await prisma.wpis.findMany({ include: { kategoria: true, komentarzs: true } });
        res.json(wpisy);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const wpis = await prisma.wpis.findUnique({
            where: { id },
            include: { kategoria: true, komentarzs: true },
        });
        res.json(wpis);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { tytul, zawartosc, id_kategorii, tworca } = req.body;
    try {
        const wpis = await prisma.wpis.update({
            where: { id },
            data: { tytul, zawartosc, id_kategorii, tworca },
        });
        res.json(wpis);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.wpis.delete({ where: { id } });
        res.json({ message: 'Wpis usunięty' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;