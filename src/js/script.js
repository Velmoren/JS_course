'use strict';

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 13000);
        }
        while (isNaN(money) || money == '' || money == null);
        // переводим значение money в тип Number
        // money = +money;
        console.log(money);
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 75000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // метод сохранения ответов на вопросы о возможных расходах
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую!', 'Первый, Второй, Третий');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let myCountPrice = function() {

            };
            // при первой итерации задаем первый вопрос и записываем данные в обьект expenses
            if (i === 0) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кофе')] = myCountPrice();
                // при второй итерации задаем второй вопрос и записываем данные в обьект expenses
            } else if (i === 1) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Пицца')] = prompt(
                    'Во сколько это обойдется?', 30);
            }

        }
    },
    // метод подчета и возврата суммы всех расходов
    getExpensesMonth: function() {
        appData.getExpensesMonth = 0;
    },
    // метод подчета накоплений за месяц
    getAccumulatedMonth: function() {
        return money - appData.getExpensesMonth;
    },
    // метод подчета периода достижения цели
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.getAccumulatedMonth());
    },
    // На основании budgetDay определяем уровень дохода 
    getStatusIncome: function() {
        let budgetDay,
            budgetMonth;
        // Высчитываем бюджет на месяц, выводим данные
        budgetMonth = Math.floor(money - appData.getExpensesMonth);
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
    }
};

// вызываем метод appData.getExpensesMonth();
appData.asking();
for (let key in appData.expenses) {
    appData.budgetMonth += +appData.expenses[key];
    console.log(appData.budgetMonth);
}
// выводим в консоль Накопления за период
console.log('Накопления за период: ' + appData.getAccumulatedMonth() + ' руб.');
// выводим в консоль срок достижения цели в месяцах
console.log((appData.getTargetMonth() >= 0) ?
    'Cрок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
// Выводим уровень заработка
console.log(appData.getStatusIncome());

console.log(appData.expenses);
