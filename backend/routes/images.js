// creating routes
const router = require('express').Router();
const auth = require("../middleware/auth");
const Image = require('../models/images.model');

// posts the image cloudinary url to the database
router.post('/upload', auth, async (req, res) => {
    try {
      const newImage = new Image({
        userId: req.user,
        imageUrl: req.body.imageUrl,
      });
      await newImage.save();
      res.json(newImage.imageUrl);
    } catch (err) {
      console.error('Something went wrong', err);
    }
});

// Gets the latest uploaded image url for that specific user
router.get('/getLatest', auth, async (req, res) => {
    const getImage = await Image.findOne({userId: req.user}).sort({ _id: -1 });
    res.json(getImage.imageUrl);
});

module.exports = router;