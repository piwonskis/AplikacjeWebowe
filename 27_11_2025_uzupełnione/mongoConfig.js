const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://blogAdmin:1234@cluster0.58jgcdj.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri);

let db;

async function connectToMongo() {
    try {
        await client.connect();
        db = client.db('blogLogsDB');
        console.log('Connected to MongoDB Atlas');
        return db;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected. Call connectToMongo first.');
    }
    return db;
}

module.exports = { connectToMongo, getDb };