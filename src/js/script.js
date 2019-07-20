window.addEventListener('DOMContentLoaded', function () {
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

		const menu = document.querySelector('menu'),
			body = document.querySelector('body');

		body.addEventListener('click', (event) => {
			let target = event.target;

			// если target имеет класс close-btn - открываем меню и выходим из программы
			if (target.classList.contains('close-btn') && target.closest('.menu')) {
				menu.classList.toggle('active-menu');
				return;
			}

			// если target не имеет класса close-btn, но имеет тэг <a></a> закрываем меню и выходим из программы
			if (target.tagName === 'A' && target.closest('.menu')) {
				menu.classList.toggle('active-menu');
				return;
			}

			// если прочие условия не подошли - применяем к target метод closest() и ищем в родителях target класс .menu
			target = target.closest('.menu');
			if (target !== null && target.classList.contains('menu')) {
				menu.classList.toggle('active-menu');
				return;
			}
			menu.classList.remove('active-menu');
			return;
		});
	};
	toggleMenu();

	// popup
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
			// closest проверяет у элемента указанный селектор и, если он соответствует, возвращает в target этот элемент
			// если же у target нет этого класса - метод поднимается по родителю выше и проверяет там и берет в target родителя
			// если нет и там, то идет дольше. Если не находит вообще - возвращает null
			target = target.closest('.service-header-tab');

			// если наш target имеет класс service-header-tab
			if (target.classList.contains('service-header-tab')) {

				tab.forEach((item, i) => {

					if (item === target) {
						toggleTabContent(i);
					}

				});
			}

		});
	};
	tabs();

	// slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			btn = document.querySelectorAll('.portfolio-btn'),
			dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0;

		const autoPlaySlide = () => {
			slide[currentSlide].classList.remove('portfolio-item-active');
			currentSlide++;
			slide[currentSlide].classList.add('portfolio-item-active');
		};

		const startSlide = () => {
			setInterval(autoPlaySlide, 2000);
		};

		const stopSlide = () => {

		};

		startSlide();
	};
	slider();
});