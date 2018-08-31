"use strict"
// Есть массив [30, -5, 0, 10, 5].
// Напишите функцию сортировки от наименьшего к наибольшему, результат [-5, 0, 5, 10, 30] . Не используйте стандартную функцию sort.

const list = [30, -5, 0, 10, 5];

function mySort(list) {
  for (let i = 0; i < list.length; i++) {

    for (let j = 1; j < list.length; j++) {
      if ( list[j-1] > list[j] ) {
        let buffer = list[j-1];
        
        list[j-1] = list[j];
        list[j] = buffer;
      }
    }
  }
}

mySort(list);

console.log(list); // [-5, 0, 5, 10, 30]
