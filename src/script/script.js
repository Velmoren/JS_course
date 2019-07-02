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
	allInputs = document.querySelectorAll('input[type=text]'),
	// все кнопки плюс
	btnPlus = document.querySelectorAll('.btn_plus');

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
	// метод смены IncomePeriodValue в зависимости от periodAmountValue
	cahgeIncomePeriodValue: () => {
		incomePeriodValue.value = appData.calcPeriod();
	},
	addChange: function() {

	},
	removeChange: function() {

	},
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

		this.getExpenses();
		this.getIncome();
		this.getAddIncome();
		this.getAddExpenses();
		this.getExpensesMonth();
		this.getInfoDeposit();
		this.getBudget();

		this.showResult();
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
				this.income[itemIncome.charAt(0).toUpperCase() + itemIncome.substring(1).toLowerCase()] = cashIncome;
				this.incomeMonth += +cashIncome;
			}
		});
	},

	// метод, заносящий результат в объект 
	getExpenses: function() {
		expensesItems.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses.charAt(0).toUpperCase() + itemExpenses.substring(1).toLowerCase()] = cashExpenses;
			}
		});
	},

	showResult: function() {

		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcPeriod();
		budgetMonthValue.value = this.budgetMonth;
		periodSelect.addEventListener('change', this.cahgeIncomePeriodValue);
	},

	getAddIncome: function() {
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	},

	getAddExpenses: function() {
		let addExpenses = additionalExpensesItem.value.split(', ');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	},

	// метод подчета и возврата суммы всех расходов
	getExpensesMonth: function() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	},

	// метод подчета накоплений за месяц
	getBudget: function() {
		// Высчитываем бюджет на месяц, выводим данные
		this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth);
		// Высчитываем дневной бюджет с учетом budgetMonth
		this.budgetDay = Math.floor(Number(this.budgetMonth / 30));
	},

	// метод подчета периода достижения цели
	getTargetMonth: function() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	},

	// На основании budgetDay определяем уровень дохода 
	getStatusIncome: function() {
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
	},

	getInfoDeposit: function() {
		if (this.deposit) {
			// валидация процентной ставки
			do {
				this.percentDeposit = prompt('Какой годовой процент?', '10');
			}
			while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
			// валидация суммы депозита
			do {
				this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
			}
			while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
		}
	},

	calcPeriod: function() {
		return this.budgetMonth * periodSelect.value;
	},
	reset: function() {
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
		// удаляем обработчик события
		periodSelect.removeEventListener('change', this.cahgeIncomePeriodValue);

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
	}
};

start.addEventListener('click', appData.start.bind(appData));
inputSalary.addEventListener('keyup', appData.check);
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', () => { periodAmount.innerHTML = periodSelect.value; });
cancel.addEventListener('click', appData.reset.bind(appData));
