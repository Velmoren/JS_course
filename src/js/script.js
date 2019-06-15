'use strict';

let money,
    getStringArr = [],
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 75000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // метод сохранения ответов на вопросы о возможных расходах и доходах
    asking: function() {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
            }
            while (Number(itemIncome) || itemIncome === '' || itemIncome === null);
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую!', 'Первый, Второй, Третий');
        appData.addExpenses = addExpenses.toLowerCase().split(',');

        for (let i = 0; i < 2; i++) {
            let itemExpenses;
            let cashExpenses;
            // При каждой итерации задаем вопрос 
            do {
                itemExpenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кофе');
            }
            while (Number(itemExpenses) || itemExpenses === '' || itemExpenses === null);
            // и еще один вопрос о стоимости с последующей валидацией
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 30);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);
            // создаем параметр обьекта expenses 
            appData.expenses[itemExpenses] = cashExpenses;
        }
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
    },

    getInfoDeposit: function() {
        if (appData.deposit) {
            // валидация процентной ставки
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
            // валидация суммы депозита
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
        }
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

// вызываем методы обьекта appData;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

// выводим в консоль расходы ха месяц
console.log('Расходы за месяц составляют ' + appData.expensesMonth + 'руб.');
// выводим в консоль срок достижения цели в месяцах
console.log((appData.getTargetMonth() >= 0) ?
    'Cрок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
// Выводим уровень заработка
console.log(appData.getStatusIncome());

// Выводим в консоль возможные доходы и расходы в одну строку, разделенные запятыми

for (let key in appData.income) {
    // принимаем ключ, выводим первый символ строки в верхнем регистре, все остальные начиная со второго символа в нижнем регистре
    // добавляем в массив getStringArr
    key = key.charAt(0).toUpperCase() + key.substring(1).toLowerCase();
    getStringArr.push(key);
}
for (let key in appData.expenses) {
    key = key.charAt(0).toUpperCase() + key.substring(1).toLowerCase();
    getStringArr.push(key);
}

console.log('Возможные доходы и расходы: ' + getStringArr.join(', '));

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key + ': ' + appData[key]);
}
