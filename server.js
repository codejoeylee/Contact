const express = require('express');
const dotenv = require('dotenv')
const mongodb = require('./db/connect');
const contactRoutes = require('./routes/contactRoute')

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/contacts', contactRoutes)


// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const startServer = async () => {
    try {
        await mongodb.initDb();
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
};

startServer();