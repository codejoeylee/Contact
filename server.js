const express = require('express');
const dotenv = require('dotenv')
const mongodb = require('./db/connect');
const contactRoutes = require('./routes/contactRoute')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const allRoutes = require("./routes")

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();


//middleware to enable cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger documentation on the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.use('/', allRoutes)


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