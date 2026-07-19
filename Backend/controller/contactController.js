const { createContact, getAllContacts, deleteContactById } = require("../model/contactModel");

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await createContact(name, email, message);
    res.status(201).json({ message: "Message Sent Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({ message: "Success", contacts });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    await deleteContactById(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { submitContact, getContacts, deleteContact };
