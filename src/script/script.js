'use strict';
const start = document.querySelector('#start'),
	cancel = document.querySelector('#cancel'),
	btnAdd = document.querySelectorAll('button'),
	btnAddIncome = document.querySelector('.income button'),
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
	depositCheck = document.querySelector('#deposit-check'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');



// все input
let allInputs = document.querySelectorAll('input[type=text]'),
	// все кнопки плюс
	btnPlus = document.querySelectorAll('.btn_plus'),
	incomeItems = document.querySelectorAll('.income-items'),
	expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
	constructor() {
		this.budget = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
	}

	// метод смены IncomePeriodValue в зависимости от periodAmountValue
	cahgeIncomePeriodValue() {
		incomePeriodValue.value = this.calcPeriod();
	}

	check() {
		if (inputSalary.value !== '') {
			start.removeAttribute('disabled', 'disabled');
		}
	}

	start() {
		// проверка на заполненный Месячный доход
		if (inputSalary.value === '') {
			start.setAttribute('disabled', 'disabled');
			return;
		}

		// иначе функция перебора и блокировки input и кнопки плюс
		// все input ищем повторно чтоб поймать новосозданные
		allInputs = document.querySelectorAll('input[type=text]');
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

		this.budget = +inputSalary.value;

		this.getItems(expensesItems, 'expenses', this.expenses);
		this.getItems(incomeItems, 'income', this.income);
		this.getAddIncome();
		this.getAddExpenses();
		this.getMonth();
		this.getInfoDeposit();
		this.getBudget();

		this.showResult();


	}


	// item = IncomeItem
	addBlock(item, items, btnItem) {
		// копируем первый елемент и вставляем его до кнопки Плюс
		const cloneItem = items[0].cloneNode(true);

		// очищаем клонируемые поля ввода, перебираем все дочерние елементы cloneIncomeItem.childNodes
		// если тип элемента text то очищаем его значение
		for (let i = 0; i < cloneItem.childNodes.length; i++) {
			if (cloneItem.childNodes[i].type == 'text') {
				cloneItem.childNodes[i].value = '';
			}
		}
		items[0].parentNode.insertBefore(cloneItem, btnItem);
		// проверяем количество елементов и если их 3 - скрываем кнопку Плюс
		items = document.querySelectorAll(`.${item}-items`);
		if (items.length === 3) {
			btnItem.style.display = 'none';
		}
	}
	// метод, заносящий результат в объект 
	getItems(myItems, myElem, myObj) {
		myItems = document.querySelectorAll(`.${myElem}-items`);
		myItems.forEach((item) => {
			const itemIncome = item.querySelector(`.${myElem}-title`).value;
			const cashIncome = +item.querySelector(`.${myElem}-amount`).value;
			if (itemIncome !== '' && cashIncome !== '') {
				myObj[itemIncome.charAt(0).toUpperCase() + itemIncome.substring(1).toLowerCase()] = cashIncome;
			}
		});
	}

	showResult() {

		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcPeriod();
		budgetMonthValue.value = this.budgetMonth;

		let serialObj = JSON.stringify(appData);
		localStorage.setItem("myKey", serialObj);
	}

	getAddIncome() {
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	}

	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(', ');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}

	// метод подчета и возврата суммы всех расходов
	getMonth() {
		for (let key in this.income) {
			this.incomeMonth += this.income[key];
		}
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}

	// метод подчета накоплений за месяц
	getBudget() {
		// Высчитываем бюджет на месяц, выводим данные
		this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth);
		// Высчитываем дневной бюджет с учетом budgetMonth
		this.budgetDay = Math.floor(Number(this.budgetMonth / 30));
	}

	// метод подчета периода достижения цели
	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}

	// На основании budgetDay определяем уровень дохода 
	getStatusIncome() {
		switch (true) {
			case this.budgetDay >= 800:
				return ('Высокий уровень дохода');
			case this.budgetDay >= 300 && this.budgetDay < 800:
				return ('Средний уровень дохода');
			case this.budgetDay >= 0 && this.budgetDay < 300:
				return ('Низкий уровень дохода');
			default:
				return ('Что то пошло не так');
		}
	}

	getInfoDeposit() {

		if (this.deposit) {
			let myPercent = depositBank.value;
			if (myPercent !== '' && typeof myPercent != 'string') {
				this.percentDeposit = +myPercent;
			}
			let myDepositMoney = depositAmount.value;
			if (myDepositMoney !== '' && typeof myDepositMoney != 'string') {
				this.moneyDeposit = +myDepositMoney;
			}
		}
	}

	calcPeriod() {
		return this.budgetMonth * periodSelect.value + (this.percentDeposit * this.moneyDeposit);
	}
	reset() {
		// разблокируем и очищаем все input[type=text]
		allInputs = document.querySelectorAll('input[type=text]');
		allInputs.forEach((item) => {
			item.removeAttribute('disabled', 'disabled');
			item.value = '';
		});

		// разблокируем кнопки Плюс
		btnPlus = document.querySelectorAll('.btn_plus');
		btnPlus.forEach((item) => {
			item.removeAttribute('disabled', 'disabled');
		});

		// меняем местами кнопки Сбросить и Расчитать
		start.setAttribute('style', 'display: block');
		cancel.setAttribute('style', 'display: none');

		// возвращаем input[range] в имходное состояние 
		periodSelect.value = 1;
		periodAmount.innerHTML = 1;

		// убираем лишние блоки input и возвращаем кнопку плюс
		incomeItems = document.querySelectorAll('.income-items');
		for (let i = 1; i < incomeItems.length; i++) {
			incomeItems[i].remove();
		}
		expensesItems = document.querySelectorAll('.expenses-items');
		for (let i = 1; i < expensesItems.length; i++) {
			expensesItems[i].remove();
		}
		btnAddExpenses.style.display = 'block';
		btnAddIncome.style.display = 'block';

		this.deposit = false;
		this.budgetMonth = 0;
		depositBank.value = 0;
		depositCheck.checked = false;
		depositBank.removeAttribute('style', 'display: block');
		depositAmount.removeAttribute('style', 'display: block');
		depositPercent.removeAttribute('style', 'display: block');
	}
	toggleDepositCalc() {
		if (this.deposit) {
			depositBank.removeAttribute('style', 'display: block');
			depositAmount.removeAttribute('style', 'display: block');
			depositPercent.removeAttribute('style', 'display: block');
			this.deposit = false;
		} else {
			depositBank.setAttribute('style', 'display: block');
			depositAmount.setAttribute('style', 'display: block');
			depositPercent.setAttribute('style', 'display: block');
			this.deposit = true;
		}

	}
	eventsListeners() {
		start.addEventListener('click', () => {
			this.start();
		});
		inputSalary.addEventListener('keyup', this.check);
		btnAddExpenses.addEventListener('click', () => {
			this.addBlock('expenses', expensesItems, btnAddExpenses);
		});
		btnAddIncome.addEventListener('click', () => {
			this.addBlock('income', incomeItems, btnAddIncome);
		});
		periodSelect.addEventListener('change', () => {
			periodAmount.innerHTML = periodSelect.value;
		});
		cancel.addEventListener('click', () => {
			this.reset();
		});
		periodSelect.addEventListener('change', () => {
			this.cahgeIncomePeriodValue();
		});
		depositCheck.addEventListener('change', () => {
			this.toggleDepositCalc();
		});
		depositBank.addEventListener('change', () => {
			depositPercent.value = depositBank.value;
		});
	}
}

let appData = new AppData();
appData.eventsListeners();