'no strict'

let num = 266219;
// переводим значение num в строку
let numStr = String(num);
let count = 0;


// при самой первой итерации задаем count значение первой цифры num, при каждой следующей итерации умножаем значение count на значение i символа цыфры num
for (let i = 0; i < numStr.length; i++) {
  if (i === 0) {
    count = +(numStr[0]);
  } else {
    count *= +(numStr[i]);
  }
}

console.log('Задание первое:', count);
console.log('Задание второе:', +(String(count ** 3).slice(0, 2)));