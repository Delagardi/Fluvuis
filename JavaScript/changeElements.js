"use strict";
// Есть массив [10, 20, 30].
// Поменяйте местами 0 и 1 элементы, чтобы получилось [20, 10, 30]

const list = [10, 20, 30];

function changeElements(list) {
  const buffer = list[0];

  list[0] = list[1];
  list[1] = buffer;

  // OR WITHOUT ADDITIONAL VARIABLE:

  // list[0] = list[0] - list[1];
  // list[1] = list[1] + list[0];
  // list[0] = list[1] - list[0];
}

changeElements(list);

console.log(list); // [20, 10, 30];
