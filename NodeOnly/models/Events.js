const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    //default: Date.now
  }
}); 

module.exports = Event = mongoose.model('events', EventSchema);