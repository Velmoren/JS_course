const calc = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	// разрешаем вводить только цифры
	calcBlock.addEventListener('keyup', (event) => {
		const target = event.target;
		target.value = target.value.replace(/[^\d,]/g, '');
	});

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1,
			count = 0;
		const typeValue = +calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}
		if (calcDay.value == 0) {
			dayValue = 1;
		} else if (calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value < 10) {
			dayValue *= 1.5;
		}

		// если наши переменные существуют
		if (typeValue && squareValue) {
			total = price * typeValue * squareValue * countValue * dayValue;
		}
		// интервал прокрутки стоимости 
		let totalInterval = setInterval(() => {

			totalValue.textContent = count;
			if ((total - count) > 10000) {
				count = count + 1000;
			} else if ((total - count) > 1000) {
				count = count + 50;
			} else if ((total - count) > 100) {
				count = count + 5;
			} else if ((total - count) > 0) {
				count = count + 1;
			} else if (count >= total) {
				clearInterval(totalInterval);
			}

		}, 10);

	};

	calcBlock.addEventListener('change', (event) => {
		const target = event.target;

		// if (target.matches('.calc-block') ||
		// 	target.matches('.calc-type') ||
		// 	target.matches('.calc-square') ||
		// 	target.matches('.calc-day')) {
		// 	console.log('adasda');

		// }

		// if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
		// 	console.log('asdasd');

		// }

		// если наш target имеет тэг select или input
		if (target.matches('select') || target.matches('input')) {
			countSum();
		}

	});
};

export default calc;