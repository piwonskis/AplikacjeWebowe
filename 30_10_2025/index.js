const express = require('express')
const path = require("node:path");
const fs = require('fs/promises');
const app = express()
app.use(express.static(path.join(__dirname, '/static')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Strona_Glowna.html'));
})

app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, 'O-nas.html'));
})
app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'Oferta.html'));
})
app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'Oferta.html'));
})

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'Kontakt.html'));
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
