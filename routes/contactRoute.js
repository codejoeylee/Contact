const express = require('express')
const contactController = require('../controller/contactController')

const router = express.Router()

router.get("/", contactController.getContacts);

router.get("/:id", contactController.getContactById);

module.exports = router 