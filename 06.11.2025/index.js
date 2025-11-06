const express = require('express')
const path = require('node:path')
const app = express()
const mysql = require('mysql');

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: true }))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
})

connection.connect()

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
  connection.query(`INSERT INTO messages (imie, nazwisko, email, message) VALUES('${req.body.imie}','${req.body.nazwisko}','${req.body.email}','${req.body.tresc}')`)
})

app.get('/api/contact-messages', (req, res) => {


    connection.query('SELECT * FROM messages', (err, rows) => {
        if (err) throw err

        res.json(rows)
    })
})

app.get('/api/contact-messages/:id', (req, res) => {
    let id = req.params.id
    connection.query(`SELECT * FROM messages WHERE id=${id}`, (err, rows) => {
        if (err){
            res.json({error:404})
        }

        res.json(rows)
    })
})

app.listen(3000, () => {
  console.log('http://localhost:3000' )
})
