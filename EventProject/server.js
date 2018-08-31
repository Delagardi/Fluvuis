const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users.js');
const events = require('./routes/api/events.js');


const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then( () => console.log('MongoDB connected'))
  .catch(error => console.log('We have an error with DB: ' + error));

mongoose.set('useFindAndModify', false);

app.get('/', (req, res) => res.send('Hello, Fluvius!'));

// Passport 
require('./config/passport.js')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/events', events);

const port = 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));

