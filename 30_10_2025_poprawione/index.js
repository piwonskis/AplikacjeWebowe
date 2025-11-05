const express = require('express')
const path = require('node:path')
const app = express()

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Strona_Glowna.html'))
})
app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(__dirname, 'O-nas.html'))
})
app.get('/oferta', (req, res) => {
  res.sendFile(path.join(__dirname, 'Oferta.html'))
})
app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'Kontakt.html'))
})
app.post('/kontakt', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
