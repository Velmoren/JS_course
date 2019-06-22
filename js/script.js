let money = 1000,
  income = 'Фриланс',
  addExpenses = 'Кофе, Пицца, Кабельное',
  deposit = false,
  mission = 5500,
  period = 10;
let budgetDay = money / 30;

console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));

console.log(income.length);

console.log('Период месяцев:', period);
console.log('Цель заработать рублей:', mission);

console.log(addExpenses.toLocaleLowerCase().split(','));

console.log('Дневной бюджет: ', budgetDay);
console.log('Остаток:', money % 30);