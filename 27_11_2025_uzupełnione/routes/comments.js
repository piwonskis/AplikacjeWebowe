const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.post('/', async (req, res, next) => {
    const { tekst, uzytkownik, id_wpisu } = req.body;
    try {
        const komentarz = await prisma.komentarz.create({
            data: { tekst, uzytkownik, id_wpisu },
        });
        res.json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const komentarze = await prisma.komentarz.findMany({ include: { wpis: true } });
        res.json(komentarze);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const komentarz = await prisma.komentarz.findUnique({
            where: { id },
            include: { wpis: true },
        });
        res.json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { tekst, uzytkownik, id_wpisu } = req.body;
    try {
        const komentarz = await prisma.komentarz.update({
            where: { id },
            data: { tekst, uzytkownik, id_wpisu },
        });
        res.json(komentarz);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.komentarz.delete({ where: { id } });
        res.json({ message: 'Komentarz usunięty' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;