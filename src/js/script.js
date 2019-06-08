'use strict';

let money,
  income = 'Фриланс',
  addExpenses =
  prompt('Перечислите возможные расходы за рассчитываемый период через запятую!', 'Первый, Второй, Третий'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 75000,
  period = 10,
  budgetDay,
  budgetMonth,
  spendingFirst,
  spendingSecond;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 13000);
  }
  while (isNaN(money) || money == '' || money == null);
  // переводим значение money в тип Number
  money = +money;
};
start();

// функция вывода типа данных и длины строки
let showTypeof = function (item) {
  console.log(item, typeof item);
};
let showLength = function (item) {
  console.log(item, item.length);
};

// функция подчета и возврата суммы всех расходов
let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    // при первой итерации задаем первый вопрос
    if (i === 0) {
      spendingFirst = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кофе');
      // при второй итерации задаем второй вопрос
    } else if (i === 1) {
      spendingSecond = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Пицца');
    }
    // заношу в переменную ответ для последующей валидации
    let count;
    do {
      count = prompt('Во сколько это обойдется?', 30);
    }
    while (isNaN(count) || count == '' || count == null);
    // если ответ валиден - переводим count в тип Number и прибавляем к sum 
    sum += +count;
  }
  return sum;
};

// присваиваем переменной getExpensesAmount результат выполнения функции getExpensesMonth()
let getExpensesAmount = getExpensesMonth();
// функция подчета накоплений за месяц
let getAccumulatedMonth = function () {
  let accumulatedMonth = money - getExpensesAmount;
  return accumulatedMonth;
};

// функция подчета периода достижения цели
let getTargetMonth = function () {
  return Math.ceil(mission / getAccumulatedMonth());
};

// На основании budgetDay определяем уровень дохода 
let getStatusIncome = function () {
  // Высчитываем бюджет на месяц, выводим данные
  budgetMonth = Math.floor(money - getExpensesAmount);
  // Высчитываем дневной бюджет с учетом budgetMonth
  budgetDay = Math.floor(Number(budgetMonth / 30));

  switch (true) {
    case budgetDay >= 800:
      return ('Высокий уровень дохода');
    case budgetDay >= 300 && budgetDay < 800:
      return ('Средний уровень дохода');
    case budgetDay >= 0 && budgetDay < 300:
      return ('Низкий уровень дохода');
    default:
      return ('Что то пошло не так');
  }
};

// выводим в консоль Накопления за период
console.log('Накопления за период: ' + getAccumulatedMonth() + ' руб.');
// выводим в консоль срок достижения цели в месяцах
console.log((getTargetMonth() >= 0) ?
  'Cрок достижения цели: ' + getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
// Выводим уровень заработка
console.log(getStatusIncome());


// выводим типы данных
showTypeof(money);
showTypeof(income);
showTypeof(deposit);
showLength(income);