const mongoose = require('mongoose');

// all info we are going to store about image in the database
const Image = mongoose.model(
  'image',
  mongoose.Schema({
    userId: String,
    imageUrl: String,
  })
);

module.exports = Image;