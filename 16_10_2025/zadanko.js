const express = require('express')
const path = require("node:path");
const fs = require('fs/promises');
const app = express()

const port = 3000

app.get('/glowna', (req, res) => {
    res.send('Strona główna');
})

app.get('/json', (req, res) => {
    res.sendFile(path.join(__dirname, 'package.json'));
})

app.get('/html', (req, res) => {
    const html = `
      <!DOCTYPE html>
      <html lang="pl">
      <head><meta charset="UTF-8"><title>HTML z Node</title></head>
      <body><h1>Witaj w HTML wygenerowanym za pomocą express</h1></body>
      </html>`;
    res.send(html);
})
app.get('/plik', (req, res) => {
    res.sendFile(path.join(__dirname, 'html.html'));
})

app.get('/get_params', (req, res) => {

        let timestamp = Date.now();
        let fileName = 'params_' + timestamp + '.json';
        let filePath = path.join(__dirname, fileName);
        let params = req.query;
        fs.writeFile(filePath, JSON.stringify(params, null, 2));
        res.json({ ok: 'ok' });
});
app.use(express.static(path.join(__dirname, '/assets')));

app.get('*', (req, res) => {
    const mime = require('mime-types')
    res.sendFile(path.join(__dirname , 'assets'+req.url), err => {
        if (err) {
            res.json({
                error: 404
            })
        }
        else {
            console.log(mime.lookup(req.url))
        }
    });
})

app.listen(port, () => {
    console.log("App listening at http://localhost:" + port);
})