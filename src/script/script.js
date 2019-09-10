'use strict';

const calculate = document.getElementById('start'),
	cancel = document.querySelector('#cancel'),
	plusIncome = document.getElementsByTagName('button')[0],
	plusExpenses = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	budgetMonthValue = document.querySelector('.budget_month-value'),
	budgetDayValue = document.querySelector('.budget_day-value'),
	expensesMonthValue = document.querySelector('.expenses_month-value'),
	additionalIncomeValue = document.querySelector('.additional_income-value'),
	additionalExpensesValue = document.querySelector('.additional_expenses-value'),
	incomePeriodValue = document.querySelector('.income_period-value'),
	targetMonthValue = document.querySelector('.target_month-value'),
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	incomeAmount = document.querySelector('.income-amount'),
	expensesTitle = document.querySelector('.expenses-title'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	data = document.querySelector('.data'),
	dataInput = data.querySelectorAll('input[type=text]'),
	allInputs = document.querySelectorAll('input'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
	placeHolderName = data.querySelectorAll('input[placeholder=Наименование]'),
	placeHolderSum = data.querySelectorAll('input[placeholder=Сумма]'),
	incomeItems = document.querySelectorAll('.income-items');

class AppData {
	constructor() {
		this.income = {};
		this.incomeMonth = 0;
		this.mission = 500000;
		this.period = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.expenses = {};
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.addExpenses = [];
		this.addIncome = [];
		this.possibleExpenses = [];
	}
	start() {
		if (salaryAmount.value === '' || isNaN(salaryAmount.value)) {
			calculate.readOnly = true;
			return;
		}
		this.budget = +salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getInfoDeposit();
		this.getBudget();
		this.getAdd(this.addExpenses);
		this.getAdd(this.addIncome);
		this.getIncome();
		this.blockInput();
		this.localStorage();
		this.showResult();
		// console.log(document.cookie = name=this.budgetMonth);
		// console.log(document.cookie = name);

		calculate.style.display = 'none';
		cancel.style.display = 'block';

	}
	localStorage() {
		localStorage.setItem('budgetMonthValue', this.budgetMonth);
		localStorage.setItem('budgetDayValue', this.budgetDay);
		localStorage.setItem('expensesMonthValue', this.expensesMonth);
		localStorage.setItem('additionalExpensesValue', this.addExpenses.join(', '));
		localStorage.setItem('additionalIncomeValue', this.addIncome.join(', '));
		localStorage.setItem('targetMonthValue', this.getTargetMonth());
		localStorage.setItem('incomePeriodValue', this.calcPeriod());
		localStorage.setItem('allInput', allInputs.values);
	}
	addBlock(cls, itms, btn) {
		let cloneItem = itms[0].cloneNode(true);
		cloneItem.children[0].value = '';
		cloneItem.children[1].value = '';
		itms[0].parentNode.insertBefore(cloneItem, btn);
		itms = document.querySelectorAll(cls);

		if (itms.length === 3) {
			btn.style.display = 'none';
		}
		cancel.addEventListener('click', () => {
			cloneItem.children[0].value = '';
			cloneItem.children[1].value = '';
			cloneItem.remove();
			btn.style.display = 'block';
		});
		placeHolderName = data.querySelectorAll('input[placeholder=Наименование]');
		placeHolderSum = data.querySelectorAll('input[placeholder=Сумма]');
		this.checkOut();
	}
	getExpenses() {
		expensesItems.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title').value,
				cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = cashExpenses;
			}
		});
	}
	getIncome() {
		incomeItems.forEach((item) => {
			let itemIncome = item.querySelector('.income-title').value,
				cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = cashIncome;
			}
		});
		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	showResult() {
		budgetMonthValue.value = localStorage.getItem('budgetMonthValue');
		budgetDayValue.value = localStorage.getItem('budgetDayValue');
		expensesMonthValue.value = localStorage.getItem('expensesMonthValue');
		additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue') /*.join(', ')*/ ;
		additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue') /*.join(', ')*/ ;
		targetMonthValue.value = localStorage.getItem('targetMonthValue');
		incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
		periodSelect.addEventListener('mouseup', () => {
			periodAmount.textContent = periodSelect.value;
			incomePeriodValue.value = this.calcPeriod();
		});
	}
	getAdd(items) {
		if (items === this.addExpenses) {
			let addExpenses = additionalExpensesItem.value.split(',');
			addExpenses.forEach((item) => {
				item = item.trim();
				if (item !== '') {
					items.push(item);
				}
			});
		}
		if (items === this.addIncome) {
			additionalIncomeItem.forEach((item) => {
				let itemValue = item.value.trim();
				if (itemValue !== '') {
					items.push(itemValue);
				}
			});
		}
	}
	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
	}
	getBudget() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}
	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}
	getStatusIncome() {
		if (this.budgetDay >= 800) {
			return 'Высокий уровень дохода';
		} else if (this.budgetDay >= 300 && this.budgetDay < 800) {
			return 'Средний уровень дохода';
		} else if (this.budgetDay >= 0 && this.budgetDay < 300) {
			return 'Низкий уровень дохода';
		} else if (this.budgetDay < 0) {
			return 'Что то пошло не так';
		}
	}
	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}
	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}
	blockInput() {
		dataInput.forEach((item) => {
			item.readOnly = true;
		});
		depositBank.disabled = true;
	}
	reset() {
		allInputs.forEach((item) => {
			item.value = '';
		});
		for (let key in this) {
			if (typeof this[key] !== 'function') {
				if (isNaN(this[key])) {
					this[key] = '';
				} else if (!isNaN(this[key])) {
					this[key] = 0;
				}
			}
		}
		this.addExpenses = [];
		this.addIncome = [];
		this.income = {};
		this.expenses = {};
		this.possibleExpenses = [];
		periodSelect.addEventListener('mouseup', () => {
			periodAmount.textContent = periodSelect.value;
			incomePeriodValue.value = 0;
		});
		dataInput.forEach((item) => {
			item.readOnly = false;
		});
		periodSelect.value = 0;
		periodAmount.textContent = 1;
		calculate.style.display = 'block';
		cancel.style.display = 'none';
		depositBank.disabled = false;
		localStorage.clear();
	}
	checkOut() {
		placeHolderName.forEach((item) => {
			item.addEventListener('input', (event) => {
				event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ .?!,]/i, '');
			});
		});
		placeHolderSum.forEach((item) => {
			item.addEventListener('blur', (event) => {
				if (isNaN(event.target.value)) {
					alert('Вводите только цифры!');
					event.target.value = '';
					return;
				}
			});
		});
	}
	eventsListeners() {
		periodSelect.addEventListener('mouseup', () => {
			periodAmount.textContent = periodSelect.value;
		});
		calculate.addEventListener('click', this.start.bind(this));
		cancel.addEventListener('click', this.reset.bind(this));
		plusExpenses.addEventListener('click', () => {
			this.addBlock('.expenses-items', expensesItems, plusExpenses);
		});
		plusIncome.addEventListener('click', () => {
			this.addBlock('.income-items', incomeItems, plusIncome);
		});
		depositCheck.addEventListener('change', () => {
			if (depositCheck.checked) {
				depositBank.style.display = 'inline-block';
				depositAmount.style.display = 'inline-block';
				appData.deposit = 'true';
				depositBank.addEventListener('change', function() {
					let selectIndex = this.options[this.selectedIndex].value;
					if (selectIndex === 'other') {
						depositPercent.style.display = 'inline-block';
						depositPercent.value = '';
					} else {
						depositPercent.style.display = 'none';
						depositPercent.value = selectIndex;
					}
				});
			} else {
				depositBank.style.display = 'none';
				depositAmount.style.display = 'none';
				depositAmount.value = '';
				appData.deposit = 'false';
			}
		});
		document.addEventListener('DOMContentLoaded', () => {
			this.showResult();
			if (budgetMonthValue.value !== '') {
				this.blockInput();
				calculate.style.display = 'none';
				cancel.style.display = 'block';
			}
		});
	}
}
const appData = new AppData();

appData.checkOut();
appData.eventsListeners();
