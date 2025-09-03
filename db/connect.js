const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let _db;

const initDb = async () => {
    if (_db) {
        console.log('Database is already initialized!');
        return;
    }
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        _db = client;
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};