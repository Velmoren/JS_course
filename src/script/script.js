'use strict';
let start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    btnAdd = document.querySelectorAll('button'),
    incomeItems = document.querySelectorAll('.income-items'),
    btnAddIncome = document.querySelector('.income button'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    btnAddExpenses = document.querySelector('.expenses button'),
    checkBoxDeposit = document.querySelector('#deposit-check'),
    // получаю поля inputs с левой стороны страницы
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    inputSalary = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelector('input.income-title'),
    inputIncomeAmount = document.querySelector('input.income-amount'),
    inputExpensesTitle = document.querySelector('input.expenses-title'),
    inputExpensesAmount = document.querySelector('input.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    // получаю блоки в правой стороне страницы по классу
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    // все input
    allInputs = document.querySelectorAll('input'),
    // все кнопки плюс
    btnPlus = document.querySelectorAll('.btn_plus');

let getStringArr = [];

let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    check: function() {
        if (inputSalary.value !== '') {
            start.removeAttribute('disabled', 'disabled');
        }
    },

    start: function() {
        // проверка на заполненный Месячный доход
        if (inputSalary.value === '') {
            start.setAttribute('disabled', 'disabled');
            return;
        }

        // иначе функция перебора и блокировки input и кнопки плюс
        // все input ищем повторно чтоб поймать новосозданные
        allInputs = document.querySelectorAll('input');
        allInputs.forEach((item) => {
            item.setAttribute('disabled', 'disabled');
        });
        // все кнопки плюс ищем повторно чтоб поймать новосозданные
        btnPlus = document.querySelectorAll('.btn_plus');
        btnPlus.forEach((item) => {
            item.setAttribute('disabled', 'disabled');
        });
        start.setAttribute('style', 'display: none');
        cancel.setAttribute('style', 'display: block');

        appData.budget = +inputSalary.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getAddIncome();
        appData.getAddExpenses();
        appData.getExpensesMonth();
        appData.getInfoDeposit();
        appData.getBudget();

        appData.showResult();
    },

    // метод добавления полей ввода 'Дополнительный доход'
    addIncomeBlock: function() {
        // копируем первый елемент и вставляем его до кнопки Плюс
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        // очищаем клонируемые поля ввода, перебираем все дочерние елементы cloneIncomeItem.childNodes
        // если тип элемента text то очищаем его значение
        for (var i = 0; i < cloneIncomeItem.childNodes.length; i++) {
            if (cloneIncomeItem.childNodes[i].type == 'text') {
                cloneIncomeItem.childNodes[i].value = '';
            }
        }

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnAddIncome);

        // проверяем количество елементов и если их 3 - скрываем кнопку Плюс
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnAddIncome.style.display = 'none';
        }
    },

    // метод добавления полей ввода 'Обязательные расходы'
    addExpensesBlock: function() {
        // копируем первый елемент и вставляем его до кнопки Плюс
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        for (var i = 0; i < cloneExpensesItem.childNodes.length; i++) {
            if (cloneExpensesItem.childNodes[i].type == 'text') {
                cloneExpensesItem.childNodes[i].value = '';
            }
        }
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);

        // проверяем количество елементов и если их 3 - скрываем кнопку Плюс
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnAddExpenses.style.display = 'none';
        }
    },

    // метод, заносящий результат в объект 
    getIncome: function() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });
    },

    // метод, заносящий результат в объект 
    getExpenses: function() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    showResult: function() {

        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        budgetMonthValue.value = appData.budgetMonth;

        periodSelect.addEventListener('change', () => { incomePeriodValue.value = appData.calcPeriod(); });
    },

    getAddIncome: function() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
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
        appData.budgetMonth = Math.floor(appData.budget + appData.incomeMonth - appData.expensesMonth);
        // Высчитываем дневной бюджет с учетом budgetMonth
        appData.budgetDay = Math.floor(Number(appData.budgetMonth / 30));
    },

    // метод подчета периода достижения цели
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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

    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

// вызываем методы обьекта appData;
start.addEventListener('click', appData.start);
inputSalary.addEventListener('keyup', appData.check);
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', () => { periodAmount.innerHTML = periodSelect.value; });
// // выводим в консоль расходы ха месяц
// console.log('Расходы за месяц составляют ' + appData.expensesMonth + 'руб.');
// // выводим в консоль срок достижения цели в месяцах
// console.log((appData.getTargetMonth() >= 0) ?
//     'Cрок достижения цели: ' + appData.getTargetMonth() + ' мес.' : 'Цель не будет достигнута');
// // Выводим уровень заработка
// console.log(appData.getStatusIncome());

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

// console.log('Возможные доходы и расходы: ' + getStringArr.join(', '));

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//     console.log(key + ': ' + appData[key]);
// }
