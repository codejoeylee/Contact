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


// Function to CREATE a new contact
exports.createContact = async (req, res) => {
    try {
      const { firstName, lastName, email, favoriteColor, birthday } = req.body;

      if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({message: "All fields are required."})
      }

      const newContact = { firstName, lastName, email, favoriteColor, birthday };

      const collection = getContactCollection();
      const result = await collection.insertOne(newContact);
      res.status(201).json({ _id: result.insertedId, ...newContact });
    } catch (error) {
        console.error('Error in createContact:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Function to UPDATE an existing contact
exports.updateContact = async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        
        const allowedUpdates = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const collection = getContactCollection();
        const result = await collection.updateOne({ _id: id }, { $set: allowedUpdates });
    
        if (!result.matchedCount) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
    
        res.status(200).json({ message: 'Contact updated successfully.' });
    } catch (error) {
        console.error('Error in updateContact:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

//Function to DELETE a contact
exports.deleteContact = async (req, res) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const collection = getContactCollection();
        const result = await collection.deleteOne({ _id: id });
        if (!result.deletedCount) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.status(200).json({ message: 'Contact deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteContact:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};