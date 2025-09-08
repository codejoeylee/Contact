const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');


//Function to get the collection ('contacts')
const getContactCollection = () => {
  const db = mongodb.getDb().db('ContactDb');
  return db.collection('contacts');
};


//Function to get all contacts 
exports.getContacts = async (req, res) => {
  try {
    const collection = getContactCollection();
    const contacts = await collection.find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}


//Function to get a single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const id = ObjectId.createFromHexString(req.params.id);
    const collection = getContactCollection();
    const contact = await collection.findOne({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error in getContactById:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}


// CREATE a new contact
exports.createContact = async (req, res) => {
    try {
        const contact = req.body;
        const collection = getContactCollection();
        const result = await collection.insertOne(contact);
        res.status(201).json({ id: result.insertedId, ...contact });
    } catch (error) {
        console.error('Error in createContact:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// UPDATE an existing contact
exports.updateContact = async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const contact = req.body;
        const collection = getContactCollection();
        const result = await collection.updateOne({ _id: id }, { $set: contact });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.status(200).json({ message: 'Contact updated successfully.' });
    } catch (error) {
        console.error('Error in updateContact:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// DELETE a contact
exports.deleteContact = async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const collection = getContactCollection();
        const result = await collection.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.status(200).json({ message: 'Contact deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteContact:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};