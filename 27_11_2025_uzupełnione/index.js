const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongo, getDb } = require('./mongoConfig');
const path = require('path');

const app = express();
app.use(bodyParser.json());

let mongoConnected = false;

app.use(async (req, res, next) => {
    const start = Date.now();

    const originalEnd = res.end;

    res.end = function (...args) {
        res.end = originalEnd;

        const result = originalEnd.apply(this, args);

        if (mongoConnected) {
            logAccess(req, res, start).catch(console.error);
        }

        return result;
    };

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

async function logAccess(req, res, startTime) {
    try {
        const db = getDb();
        const logsCollection = db.collection('accessLogs');

        const logData = {
            timestamp: new Date(),
            method: req.method,
            url: req.url,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            statusCode: res.statusCode,
            responseTime: Date.now() - startTime,
            query: req.query,
            body: req.method === 'POST' || req.method === 'PUT' ? req.body : null
        };

        await logsCollection.insertOne(logData);
    } catch (err) {
        console.error('Error logging access:', err.message);
    }
}

app.get('/', (req, res) => {
    res.json({
        message: 'Blog API Server',
        status: mongoConnected ? 'MongoDB logging enabled' : 'MongoDB not available',
        endpoints: ['/test', '/test-error', '/posts', '/categories', '/comments']
    });
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Test endpoint',
        timestamp: new Date().toISOString()
    });
});

app.get('/test-error', (req, res, next) => {
    const error = new Error('Test error for MongoDB error logging');
    error.statusCode = 400;
    next(error);
});

app.use(async (err, req, res, next) => {
    console.error('Error:', err.message);

    if (mongoConnected) {
        try {
            const db = getDb();
            const errorLogsCollection = db.collection('errorLogs');

            const errorData = {
                timestamp: new Date(),
                error: {
                    message: err.message,
                    stack: err.stack,
                    name: err.name
                },
                request: {
                    method: req.method,
                    url: req.url,
                    ip: req.ip || req.connection.remoteAddress
                },
                statusCode: err.statusCode || 500
            };

            await errorLogsCollection.insertOne(errorData);
        } catch (logError) {
            console.error('Error saving error log:', logError.message);
        }
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
            timestamp: new Date().toISOString()
        }
    });
});

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

try {
    const fs = require('fs');
    const routesPath = path.join(__dirname, 'routes');

    if (fs.existsSync(path.join(routesPath, 'posts.js'))) {
        const postsRouter = require('./routes/posts');
        app.use('/posts', postsRouter);
    }

    if (fs.existsSync(path.join(routesPath, 'categories.js'))) {
        const categoriesRouter = require('./routes/categories');
        app.use('/categories', categoriesRouter);
    }

    if (fs.existsSync(path.join(routesPath, 'comments.js'))) {
        const commentsRouter = require('./routes/comments');
        app.use('/comments', commentsRouter);
    }

} catch (error) {
    console.error('Error loading routers:', error.message);
}

async function initializeMongoDB() {
    try {
        await connectToMongo();
        mongoConnected = true;
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        mongoConnected = false;
    }
}

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

async function startServer() {
    await initializeMongoDB();

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();

process.on('SIGINT', async () => {
    console.log('Closing server...');
    process.exit(0);
});