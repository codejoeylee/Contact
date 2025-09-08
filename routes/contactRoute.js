const express = require('express')
const contactController = require('../controller/contactController')

const router = express.Router()

router.get("/", contactController.getContacts);

router.get("/:id", contactController.getContactById);

// Create a new contact
router.post('/', contactController.createContact);

// Update an existing contact
router.put('/:id', contactController.updateContact);

// Delete a contact
router.delete('/:id', contactController.deleteContact);


module.exports = router 