"use strict";
//Напишите свою реализацию bind.
var func1 = function(message) {
  this(message);
}

var func2 = func1.bind(alert);

func2('Test'); // alert 'Test'

function myBind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

var func3 = myBind(func1, alert);

func3('Test'); // alert 'Test'