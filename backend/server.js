
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps us to connect to mongodb database
//for twilio
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const path = require('path');

require('dotenv').config(); //so that we can have environment variables in the dotenv file

    // Sources:
    // https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1
    // MERN Stack Tutorial with Auth (8 part series):
    // https://www.youtube.com/watch?v=4_ZiJGY5F38
    // https://www.twilio.com/blog/send-an-sms-react-twilio

//added
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express(); // used to create our express server
const port = process.env.PORT || 5000; // localhost 5000 is our route url

app.use(cors());
app.use(express.json()); //setting up middleware - allows to parse JSON cause server is sending and receiving JSON
//added
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const uri = process.env.ATLAS_URI; //database uri
// connects us to mongodb
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// tell server to route files
const imageRouter = require('./routes/images');
const symptomsRouter = require('./routes/symptoms');
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

// tell server to use route files
app.use('/images', imageRouter);
app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);
app.use('/symptoms', symptomsRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('../build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
};

app.listen(port, () => { //starts the server
    console.log(`Server is running on port: ${port}`);
});