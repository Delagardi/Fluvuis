const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Login Validation
const validateEventInput = require('../../validation/eventAdd.js');

// Load Event model
const Event = require('../../models/Events.js');

// Testing
router.get('/test', (req, res) => res.json(
    {
      msg: "Events works!"
    }
  )
);

// Add Event
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  // Check Validation
  if ( !isValid ) {
    return res.status(400).json(errors);
  }

  Event.findOne({ name: req.body.name })
    .then(event => {
      if ( event ) {
        return res.status(400).json({ name: 'Sorry, this event is already exist' });
      }

      const newEvent = new Event({
        name: req.body.name,
        date: req.body.date
      })
      .save()
      .then(event => res.json("Event ID is " + event.id));
    })    
    .catch(error => console.log('We have some errors with adding this event: ' + errors));
});

// Show One Event by ID
router.get('/event/:event_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Event.findById(req.params.event_id)
    .then(event => {
      if ( !event ) {
        errors.noevent = 'There is no event with this ID';        

        return res.status(404).json(errors);
      }

      res.json(event);
    })
    .catch(error =>
      res.status(404).json({ event: 'There is some problem with finding this event' })
    );
});

// Edit Event by ID
router.put('/:event_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  // Check Validation
  if ( !isValid ) {
    return res.status(400).json(errors);
  }

  Event.findByIdAndUpdate(
    req.params.event_id,  
    { 
      $set: {
        name: req.body.name,
        date: req.body.date
      }
    },
    { new: true })
      .then(event => {
        res.json(event);
      })
      .catch(error => console.log('We have some errors with updating this event: ' + errors));
});

// Delete Event by ID
router.delete('/:event_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Event.findByIdAndRemove(req.params.event_id)
    .then(event => {
      if ( !event ) {
        errors.noevent = 'There are no event with this ID';
        return res.status(404).json(errors);
      }

      res.json({ status: 'Event removed successfully'}); 
    })
    .catch(error => console.log('There are some problems with deleting this event: ' + error));
});


// Find All Events
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Event.find()
    .then(events => {
      if ( !events ) {
        errors.noevent = 'There are no events';
        return res.status(404).json(errors);
      }

      res.json(events);
    })
    .catch(err => res.status(404).json({ event: 'There are no events' }));
});

module.exports = router;