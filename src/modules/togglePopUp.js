const togglePopUp = () => {
	const popup = document.querySelector('.popup'),
		popupContent = document.querySelector('.popup-content'),
		popupBtn = document.querySelectorAll('.popup-btn');

	let togglePopUpInterval,
		count = -100;

	const easyTogglePopUp = () => {
		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				let hightMonitor = document.documentElement.clientWidth;

				popup.style.display = 'block';
				if (hightMonitor >= 992) {
					togglePopUpInterval = requestAnimationFrame(animateTogglePopUp);
				} else {
					return;
				}
			});
		});

		// скрываем наше модальное окно по клику по экрану и по крестику из одного обработчика
		popup.addEventListener('click', (event) => {
			let target = event.target,
				hightMonitor = document.documentElement.clientWidth;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				if (hightMonitor >= 992) {
					count = -100;
					cancelAnimationFrame(togglePopUpInterval);
				} else {
					return;
				}
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}

		});
	};
	easyTogglePopUp();

	let animateTogglePopUp = () => {

		togglePopUpInterval = requestAnimationFrame(animateTogglePopUp);
		count += 3;

		if (count < 0) {
			// coube.style.left = count + 'px';
			popupContent.style.transform = `translateY(${count}%)`;
		} else {
			cancelAnimationFrame(togglePopUpInterval);
			count = -100;
		}
	};

};

export default togglePopUp;