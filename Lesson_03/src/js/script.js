'use strict';

let money = +prompt('Ваш месячный доход?'),
  income = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую!'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 35000,
  period;

let budgetDay,
  budgetMonth;

let spendingFirst = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
  priceSpendingFirst = +prompt('Во сколько это обойдется?'),
  spendingSecond = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
  priceSpendingSecond = +prompt('Во сколько это обойдется?');

// Выводим цель 
console.log('Цель заработать рублей:', mission);

// Высчитываем бюджет на месяц, выводим данные
budgetMonth = money - priceSpendingFirst - priceSpendingSecond;
console.log('Доход за месяц с учетом обязательных расходов: ', budgetMonth);
period = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута через: ', period);

// Высчитываем дневной бюджет с учетом budgetMonth
budgetDay = Number(budgetMonth / 30);
console.log('Дневной бюджет: ', Math.floor(budgetDay));
console.log('Остаток:', budgetMonth % 30);

// Выводим уровень заработка
if (budgetDay >= 800) {
  console.log('Высокий уровень дохода');
} else if (budgetDay >= 300 && budgetDay < 800) {
  console.log('Средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 300) {
  console.log('Низкий уровень дохода');
} else {
  console.log('Что то пошло не так');
}

// Список возможных расходов
console.log('Список возможных расходов:', addExpenses.toLocaleLowerCase().split(','));

// Выводим типы переменных
console.log('money: ', typeof (money));
console.log('income: ', typeof (income));
console.log('deposit: ', typeof (deposit));
console.log('income:', income.length);