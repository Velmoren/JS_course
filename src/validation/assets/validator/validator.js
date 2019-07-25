const Validator = function (options) {

	const form = document.getElementById(options.id),
		elementsForm = [...form.elements].filter(item => item.tagName !== 'BUTTON'),
		error = new Set(),
		pattern = {
			name: /^[а-яА-ЯёЁ]+$/,
			email: /^\w+@\w+\.\w+$/,
			phone: /^\+?[78]([()-]*\d){10}$/,
			message: /^[а-яА-ЯёЁ]+$/
		},
		validorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};

	const isValid = (elem) => {
		const method = options.method[elem.id];
		console.log(options);

		if (method !== undefined) {
			return method.every(item => validorMethod[item[0]](elem, pattern[item[1]]));
		}
		return true;

	};

	const checkIt = (event) => {
		let target = event.target;
		console.log('target', target);

		if (isValid(target)) {
			showSuccess(target);
			error.delete(target);
		} else {
			showError(target);
			error.add(target);
		}
		console.log(error);

	};

	elementsForm.forEach((elem) => {
		elem.addEventListener('change', checkIt);
	});

	const showError = (elem) => {
		console.log('elem', elem);

		elem.classList.remove('validator_success');
		elem.classList.add('validator_error');

		if (elem.nextElementSibling) {
			elem.nextElementSibling.remove();
		}
		const errorDiv = document.createElement('div');
		errorDiv.textContent = 'Ошибка в этом поле!';
		errorDiv.classList.add('error-messege');

		elem.insertAdjacentElement('afterend', errorDiv);
	};

	const showSuccess = (elem) => {
		elem.classList.remove('validator_error');
		elem.classList.add('validator_success');

		// if (elem.nextElementSibling.classList.contains('error-messege')) {
		// 	elem.nextElementSibling.remove();
		// }
		if (elem.nextElementSibling) {
			elem.nextElementSibling.remove();
		}
	};

	for (let key in options.pattern) {
		pattern[key] = options.pattern[key];
	}

	form.addEventListener('submit', (event) => {
		elementsForm.forEach((elem) => {
			checkIt({
				target: elem
			});
		});

		if (error.size) {
			event.preventDefault();
		}
	});

};