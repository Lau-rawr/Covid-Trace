// creating a route
const router = require('express').Router();
const auth = require("../middleware/auth");
// requiring the model
const Contact = require('../models/contacts.model');
// requiring the twilio API keys
const num = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// post route that adds contacts to the database
router.post('/add', auth, async (req, res) => {
  try{
    const contactname = req.body.contactname; 
    const email = req.body.email; 
    const phonenumber = req.body.phonenumber;
    const date = req.body.date;

    if (!contactname || !email || !phonenumber || !date){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }
    
    // creates new instance of the contact with the request contact info
    const newContact = new Contact({
      contactname,
      email,
      phonenumber,
      date,
      userId: req.user,
    });
    // saves contact
    const savedContact = await newContact.save(); 
    res.json(savedContact);
  } catch (err){
      res.status(500).json({error: err.message});
  }
});

// gets all of the contacts for a specific user
router.get('/all', auth, async (req, res) => {
    const contacts = await Contact.find({userId: req.user});
    res.json(contacts);
});

// deletes a sepcific contact for a specific user based on user id and object id
router.delete('/:id', auth, async (req, res) => {
  const contact = await Contact.findOne({userId: req.user, _id: req.params.id});
  if (!contact){
    return res.status(400).json({msg: "No contact found with this ID that belongs to the current user."});
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.json(deletedContact);
});

// posts a message to a verified contact through twilio
router.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: num,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

module.exports = router; // standard in router files