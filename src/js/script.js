'use strict';

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 13000);
        }
        while (isNaN(money) || money == '' || money == null);
        // переводим значение money в тип Number
        // money = +money;
        console.log('Ваш месячный доход: ' + money + 'руб.');
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
            // валидация вводимых значений возвращает цену, если она валидна
            let myCountPrice = function() {
                let count;
                do {
                    count = prompt('Во сколько это обойдется?', 30);
                }
                while (isNaN(count) || count == '' || count == null);
                return count;
            };
            // при первой итерации задаем первый вопрос и записываем данные в обьект expenses
            if (i === 0) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кофе')] = myCountPrice();
                // при второй итерации задаем второй вопрос и записываем данные в обьект expenses
            } else if (i === 1) {
                appData.expenses[prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Пицца')] = myCountPrice();
            }
        }
    },
    // метод подчета и возврата суммы всех расходов
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    // метод подчета накоплений за месяц
    getBudget: function() {
        // Высчитываем бюджет на месяц, выводим данные
        appData.budgetMonth = Math.floor(money - appData.expensesMonth);
        // Высчитываем дневной бюджет с учетом budgetMonth
        appData.budgetDay = Math.floor(Number(appData.budgetMonth / 30));
    },
    // метод подчета периода достижения цели
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    // На основании budgetDay определяем уровень дохода 
    getStatusIncome: function() {
        switch (true) {
            case appData.budgetDay >= 800:
                return ('Высокий уровень дохода');
            case appData.budgetDay >= 300 && appData.budgetDay < 800:
                return ('Средний уровень дохода');
            case appData.budgetDay >= 0 && appData.budgetDay < 300:
                return ('Низкий уровень дохода');
            default:
                return ('Что то пошло не так');
        }
    }
};

// вызываем методы обьекта appData;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
// выводим в консоль расходы ха месяц
console.log('Расходы за месяц составляют ' + appData.expensesMonth + 'руб.');
// выводим в консоль срок достижения цели в месяцах
console.log((appData.getTargetMonth() >= 0) ?
    'Cрок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
// Выводим уровень заработка
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}
