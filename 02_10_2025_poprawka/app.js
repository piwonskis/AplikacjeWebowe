const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const url = require('url');

http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Strona główna");
    }
    else if (pathname === "/json") {
        const data = { Lesson: "Math", Grade: "6" };
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(data));
    }
    else if (pathname === "/html") {
        const html = `
        <!DOCTYPE html>
        <html lang="pl">
        <head><meta charset="UTF-8"><title>HTML z Node</title></head>
        <body><h1>Witaj w HTML wygenerowanym za pomocą Node.js</h1></body>
        </html>`;
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
    }
    else if (pathname === "/plik") {
        try {
            const file = await fs.readFile(path.join(__dirname, "html.html"), "utf-8");
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(file);
        } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Błąd odczytu pliku");
        }
    }
    else if (pathname === "/get_params") {

        const params = parsedUrl.query;
        console.log("Otrzymane parametry GET:", params);

        const timestamp = Date.now();
        const filename = path.join(__dirname, `params_${timestamp}.json`);

        try {
            await fs.writeFile(filename, JSON.stringify(params, null, 2), "utf-8");
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ 'ok': 'ok' }));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Błąd zapisu pliku");
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 - Błąd: Nie znaleziono");
    }
}).listen(8080);

console.log("Serwer został uruchomiony na http://localhost:8080");
