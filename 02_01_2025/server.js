const http = require('http');
const fs = require('fs/promises');
const path = require('path');

http.createServer(async (req, res) => {
    if (req.url === "/") {
        // Strona główna
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Strona główna");
    }
    else if (req.url === "/json") {
        // JSON
        const data = { Lesson: "Math", Grade: "6" };
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(data));
    }
    else if (req.url === "/html") {
        // HTML generowany w kodzie
        const html = `
      <!DOCTYPE html>
      <html lang="pl">
      <head><meta charset="UTF-8"><title>HTML z Node</title></head>
      <body><h1>Witaj w HTML wygenerowanym za pomocą Node.js</h1></body>
      </html>`;
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
    }
    else if (req.url === "/plik") {
        // HTML z pliku
        try {
            const file = await fs.readFile(path.join(__dirname, "html.html"), "utf-8");
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(file);
        } catch (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Błąd odczytu pliku");
        }
    }
  else if (req.url.startsWith("/get_params")) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const params = Array.from(urlObj.searchParams.entries());

    console.log("Odebrane parametry GET:", params);

    const timestamp = Date.now();
    const fileName = `params_${timestamp}.json`;

    try {
        await fs.writeFile(
            path.join(__dirname, fileName),
            JSON.stringify(params, null, 2),
            "utf-8"
        );

        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ ok: "ok" }));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "Błąd zapisu pliku" }));
    }
}



    else {
        // 404
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 - Błąd: Nie znaleziono");
    }
}).listen(8080);

console.log("Serwer został uruchomiony na http://localhost:8080");
