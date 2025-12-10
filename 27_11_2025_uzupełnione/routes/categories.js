const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.post('/', async (req, res, next) => {
    const { nazwa, opis_kategorii } = req.body;
    try {
        const kategoria = await prisma.kategoria.create({
            data: { nazwa, opis_kategorii },
        });
        res.json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const kategorie = await prisma.kategoria.findMany({ include: { wpis: true } });
        res.json(kategorie);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const kategoria = await prisma.kategoria.findUnique({
            where: { id },
            include: { wpis: true },
        });
        res.json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { nazwa, opis_kategorii } = req.body;
    try {
        const kategoria = await prisma.kategoria.update({
            where: { id },
            data: { nazwa, opis_kategorii },
        });
        res.json(kategoria);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.kategoria.delete({ where: { id } });
        res.json({ message: 'Kategoria usunięta' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;