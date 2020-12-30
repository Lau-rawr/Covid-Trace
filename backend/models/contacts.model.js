const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// all info we are going to store about contacts in the database
const contactSchema = new Schema({ 
  userId: { type: String, required: true },
  contactname: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  date: { type: String, required: true },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;