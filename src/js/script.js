window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	// таймер 
	const countTimer = () => {
		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			// назначаем переменной дату окончания акции
			let dateStop = new Date().setHours(24, 0, 0, 0),
				// назначаем переменной нынешнюю дату
				dateNow = new Date().getTime(),
				// находим разницу между датой нынешней и датой окончания в секундах(делим на 1000)
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			// hours = Math.floor((timeRemaining / 60 / 60) % 24);
			// day = Math.floor(timeRemaining / 60 / 60 / 24);

			// возвращаем обьект значений
			return {
				timeRemaining,
				hours,
				minutes,
				seconds
			};
		}

		function updateClock() {
			let timer = getTimeRemaining();
			// если число меньше 10 добавляем перед ним 0

			(timer.hours >= 10) ? timerHours.textContent = timer.hours: timerHours.textContent = "0" + timer.hours;

			(timer.minutes >= 10) ? timerMinutes.textContent = timer.minutes: timerMinutes.textContent = "0" + timer.minutes;

			(timer.seconds >= 10) ? timerSeconds.textContent = timer.seconds: timerSeconds.textContent = "0" + timer.seconds;

			if (timer.seconds == 0) {
				// очищаем setInterval если время вышло
				timerHours.textContent = "24";
				timerMinutes.textContent = "00";
				timerSeconds.textContent = "00";
			}
		}

		let timerInterval = setInterval(updateClock, 1000);

	};
	countTimer();

	// меню
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			manuItems = menu.querySelectorAll('ul>li');

		const handlerManu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerManu);
		closeBtn.addEventListener('click', handlerManu);
		manuItems.forEach((elem) => elem.addEventListener('click', handlerManu));

	};
	toggleMenu();

	// popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupContent = document.querySelector('.popup-content'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		let togglePopUpInterval,
			count = -100;

		const easyTogglePopUp = () => {
			popupBtn.forEach((elem) => {
				elem.addEventListener('click', () => {
					let hightMonitor = document.documentElement.clientWidth;

					popup.style.display = 'block';
					if (hightMonitor >= 992) {
						console.log(hightMonitor);

						togglePopUpInterval = requestAnimationFrame(animateTogglePopUp);
					} else {
						return;
					}
				});
			});

			popupClose.addEventListener('click', () => {
				let hightMonitor = document.documentElement.clientWidth;
				popup.style.display = 'none';
				if (hightMonitor >= 992) {
					count = -100;
					cancelAnimationFrame(togglePopUpInterval);
				} else {
					return;
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
	togglePopUp();

	// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');
		const toggleTabContent = (index) => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;

			// пока наш таргет не является tabHeader
			while (target !== tabHeader) {

				// если наш target имеет класс service-header-tab
				if (target.classList.contains('service-header-tab')) {

					tab.forEach((item, i) => {

						if (item === target) {
							toggleTabContent(i);
						}

					});
					return;
				}
				// если не имеет то наш таргет теперь его родитель
				target = target.parentNode;
			}

		});
	};
	tabs();
});
