// creating a route
const router = require('express').Router();
const auth = require("../middleware/auth");
// requiring the model
const Record = require('../models/symptoms.model');

// posts daily symptoms to the database for a specific user
router.post('/add', auth, async (req, res) => {
  try{
    const symptoms = req.body.symptoms; 
    const fever = req.body.fever; 
    const date = req.body.date;

    if (!fever || !date){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }

    // creates a new instance of a record with the request information 
    const newRecord = new Record({
      symptoms,
      fever,
      date,
      userId: req.user,
    });
    const savedRecord = await newRecord.save(); 
    res.json(savedRecord);
  } catch (err){
      res.status(500).json({error: err.message});
  }
});

module.exports = router; // standard in router files