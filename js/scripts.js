'use strict'

const arr = ['01234', '12345', '23456', '34567', '45678', '56789', '67890'];
const num = 100;

// задание 1
for (let i = 0; i < arr.length; i++) {
  if (arr[i].charAt(0) == 2 || arr[i].charAt(0) == 4) console.log(arr[i]);
}

// задание 2
for (var i = 2; i <= num; i++) {
  for (var j = 2; j <= i; j++) {
    if (i % j === 0) break;
  }
  if (j === i) console.log('Число ' + i + ' делится только на ' + 1 + ' и ' + i);
}