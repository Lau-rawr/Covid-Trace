const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

// all info we are going to store about users in sign up
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

// allows us to search and save users
const User = mongoose.model('User', userSchema);

module.exports = User;