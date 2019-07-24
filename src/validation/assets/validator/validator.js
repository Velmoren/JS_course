const Validator = function(options) {

	const form = document.getElementById(options.id),
		elementsForm = [...form.elements].filter(item => item.tagName !== 'BUTTON'),
		error = new Set(),
		pattern = {
			email: /^\w+@\w+\.\w+$/,
			phone: /^\+?[78]([()-]*\d){10}$/
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

	const isValid = () => {
		(1: 49);
	};

	const checkIt = (event) => {
		let target = event.target;

		if (isValid()) {
			showSuccess(target);
			error.delete(target);
		} else {
			showError(target);
			error.add(target);
		}
	};

	elementsForm.forEach((elem) => {
		elem.addEventListener('change', checkIt);
	});

	const showError = (elem) => {
		elem.classList.remove('validator_success');
		elem.classList.add('validator_error');

		const errorDiv = document.createElement('div');
		errorDiv.textContent = 'Ошибка в этом поле!';
		errorDiv.classList.add('error-messege');

		elem.insertAdjacentElement('afterend', errorDiv);
	};

	const showSuccess = (elem) => {
		elem.classList.remove('validator_error');
		elem.classList.add('validator_success');

		if (elem.nextElementSibling.classList.contains('error-messege')) {
			elem.nextElementSibling.remove();
		}
	};

	for (let key in options.pattern) {
		pattern[key] = options.pattern[key];
	}

};
