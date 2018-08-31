const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEventInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.date = !isEmpty(data.date) ? data.date : '';

  if ( !Validator.isLength(data.name, {min: 4}) ) {
    errors.name = 'Name must be more then 4 characters';
  }

  if ( Validator.isEmpty(data.name) ) {
    errors.name = 'Name field is required';
  }

  if ( !Validator.isISO8601(data.date) ) {
    errors.date = 'Date is invalid';
  }

  if ( Validator.isEmpty(data.date) ) {
    errors.date = 'Date field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
