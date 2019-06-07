'use strict';

let money = +prompt('Ваш месячный доход?', 13000),
  income = 'Фриланс',
  addExpenses =
  prompt('Перечислите возможные расходы за рассчитываемый период через запятую!', 'Первый, Второй, Третий'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 75000,
  period = 10;

let budgetDay,
  budgetMonth;

let spendingFirst = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кофе'),
  priceSpendingFirst = +prompt('Во сколько это обойдется?', 30),
  spendingSecond = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Пицца'),
  priceSpendingSecond = +prompt('Во сколько это обойдется?', 120);

// функция вывода типа данных и длины строки
let showTypeof = function (item) {
  console.log(item, typeof item);
};
let showLength = function (item) {
  console.log(item, item.length);
};

// функция вывода суммы всех расходов за месяц 
let getExpensesMonth = function () {
  console.log('Сумма всех расходов за месяц: ', (priceSpendingFirst + priceSpendingSecond));
};

// функция подчета и возврата суммы всех расходов
let getExpensesMonthCount = function () {
  let allSpending = priceSpendingFirst + priceSpendingSecond;
  return allSpending;
};
// функция подчета накоплений за месяц
let getAccumulatedMonth = function () {
  let accumulatedMonth = money - getExpensesMonthCount();
  return accumulatedMonth;
};
// функция подчета периода достижения цели
let getTargetMonth = function () {
  return Math.ceil(mission / getAccumulatedMonth());
};

// выводим в консоль Накопления за период
console.log('Накопления за период: ' + getAccumulatedMonth() + ' руб.');
// выводим в консоль срок достижения цели в месяцах
console.log('Cрок достижения цели: ' + getTargetMonth() + ' мес.');