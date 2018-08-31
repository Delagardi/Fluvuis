const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

// Load Login Validation
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/Users.js');

// Testing
router.get('/test', (req, res) => res.json(
    {
      msg: "Users works!"
    }
  )
);

// Registration of users
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if ( user ) {
        return res.status(400).json({ email: 'Sorry, email already exist' });
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });

        // Password, salt, hash
        bcrypt.genSalt(10, (error, salt) =>  {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
              if ( error ) throw error;

              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(error => console.log('We have an error with password save' + error));
          })
        })
      }
    })
});

// Login of users (returning the token)
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if ( !isValid ) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Check user by email
  User.findOne({ email: email })
    .then(user => {
      if ( !user ) {
        errors.email = 'User email not found';
        return res.status(400).json(errors);
      }

      // Check password of user
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if ( isMatch ) {
            // User matched

            // Creating JWT payload for token
            const payload = {
              id: user.id,
              email: user.email
            }

            //Sign Token (expires in 7 days)
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 604800 }, 
              (error, token) => {
                res.json({
                  status: "OK",
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            errors.password = 'Password is incorrect'
            return res.status(400).json(errors);
          }
        });
    });
});

module.exports = router;