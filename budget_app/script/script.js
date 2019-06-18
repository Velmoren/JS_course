'use strict';
let btnCount = document.querySelector('#start'),
    btnAddIncome = document.querySelector('.income button'),
    btnAddExpenses = document.querySelector('.expenses button'),
    checkBoxDeposit = document.querySelector('#deposit-check'),
    // получаю поля inputs с левой стороны страницы
    inputIncomeItems = document.querySelectorAll('.additional_income-item'),
    inputSalary = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelector('input.income-title'),
    inputIncomeAmount = document.querySelector('input.income-amount'),
    inputExpensesTitle = document.querySelector('input.expenses-title'),
    inputExpensesAmount = document.querySelector('input.expenses-amount'),
    inputExpensesItem = document.querySelector('.additional_expenses-item'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select'),
    // получаю блоки в правой стороне страницы по общему классу (далее буду обращяться по элементу массива)
    resultTotals = document.querySelectorAll('.result-total');
