const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// all info we are going to store about symptoms
const symptomsSchema = new Schema({ 
  userId: { type: String, required: true },
  symptoms: { type: Array, required: false },
  fever: { type: String, required: true },
  date: { type: String, required: true },
}, {
  timestamps: true,
});

const Record = mongoose.model('Record', symptomsSchema);

module.exports = Record;