// routes/index.js
const express = require('express');
const router = express.Router();
const contactRoutes = require('./contactRoute');

// Mount the contact routes under the /contacts path
router.use('/contacts', contactRoutes);

module.exports = router;

