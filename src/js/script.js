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

		const menu = document.querySelector('menu');

		document.body.addEventListener('click', (event) => {
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
			// если target - наше активное меню - просто выходим из программы
			if (target.classList.contains('active-menu')) {
				return;
			}
			// если прочие условия не подошли - применяем к target метод closest() и ищем в родителях target класс .menu
			target = target.closest('.menu');
			if (target !== null && target.classList.contains('menu')) {
				menu.classList.toggle('active-menu');
				return;
			}
			// если ни одно условие не подходит - просто закрываем меню
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
			// если же у target нет этого класса - метод поднимается по родителю выше и проверяет там и берет в target 
			// родителя если нет и там, то идет дольше. Если не находит вообще - возвращает null
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
			slider = document.querySelector('.portfolio-content');

		for (let i = 0; i < slide.length; i++) {
			const ul = document.querySelector(`.portfolio-dots`),
				li = document.createElement(`li`);
			if (i == 0) {
				li.setAttribute("class", "dot dot-active");
				// console.log(li);
				ul.appendChild(li);
			} else {
				li.setAttribute("class", "dot");
				ul.appendChild(li);
			}
		}

		const dot = document.querySelectorAll(`.dot`);

		let currentSlide = 0,
			interval,
			userTimer = 1500;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', (event) => {
			event.preventDefault();

			let target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem == target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide(userTimer);
			}
		});

		startSlide(userTimer);
	};
	slider();

	// Our party
	const ourParty = () => {
		const command = document.querySelector('#command');

		command.addEventListener('mouseover', (event) => {
			let target = event.target;
			if (target.tagName !== 'IMG') {
				return;
			}
			target.dataset.oldImg = target.getAttribute('src');
			target.src = target.dataset.img;
		});
		command.addEventListener('mouseout', (event) => {
			let target = event.target;
			if (target.tagName !== 'IMG') {
				return;
			}
			target.src = target.dataset.oldImg;
		});
	};
	ourParty();

	// calculator
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
	calc(100);

	// scroll
	const smothScroll = () => {
		const anchors = document.querySelectorAll('[href^="#"]'),
			animationTime = 800,
			framesCount = 20;

		anchors.forEach(item => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				let target = event.target;
				if (target.closest('.active-menu ul')) {
					let myItem = item.getAttribute('href');
					// для каждого якоря берем соответствующий ему элемент и определяем его координату Y
					let coordY = document.querySelector(myItem).getBoundingClientRect().top;

					// запускаем интервал, в котором
					let scroller = setInterval(() => {
						// считаем на сколько скроллить за 1 такт
						let scrollBy = coordY / framesCount;
						// если к-во пикселей для скролла за 1 такт больше расстояния до элемента
						// и дно страницы не достигнуто
						if (scrollBy > window.pageYOffset -
							coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
							// то скроллим на к-во пикселей, которое соответствует одному такту
							window.scrollBy(0, scrollBy);
						} else {
							// иначе добираемся до элемента и выходим из интервала
							window.scrollTo(0, coordY);
							clearInterval(scroller);
						}
						// время интервала равняется частному от времени анимации и к-ва кадров
					}, animationTime / framesCount);
				}
			});
		});
	};
	smothScroll();

	// send-ajax-form
	const sendForm = () => {

		const errorMessage = 'Что то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const formArr = document.querySelectorAll('form');

		formArr.forEach((item) => {
			item.addEventListener('input', (elem) => {

				// валидация 
				if (elem.target.name === 'user_name') {
					elem.srcElement.value = elem.srcElement.value.replace(/[^а-яА-ЯёЁ ]/gi, ``);
				} else if (elem.target.name === 'user_phone') {
					elem.srcElement.value = elem.srcElement.value.replace(/[^0-9+]/gi, ``);
				} else if (elem.target.name === 'user_email') {
					// валидацию формы оставил на десерт :))
					// elem.srcElement.value = elem.srcElement.value.replace(/^\w+@\w+\.\w+$/g, ``);
				} else if (elem.target.name === 'user_message') {
					elem.srcElement.value = elem.srcElement.value.replace(/[^а-яА-ЯёЁ ]/gi, ``);
				} else {
					return;
				}

			});
			const statusMessage = document.createElement('div');
			statusMessage.style.cssText = 'font-size: 2rem; color: white';

			item.addEventListener('submit', (event) => {
				event.preventDefault();
				item.appendChild(statusMessage);
				statusMessage.textContent = loadMessage;

				const formData = new FormData(item);
				let body = {};

				formData.forEach((val, key) => {
					body[key] = val;
				});
				postData(body)
					.then((response) => {
						setTimeout(() => {
							if (response.status !== 200) {
								statusMessage.textContent = errorMessage;
								throw new Error('status network not 200');
							}
							const myInputs = item.querySelectorAll('input');

							myInputs.forEach((elem) => {
								elem.value = '';
							});

							statusMessage.textContent = successMessage;
						}, 1000);
					})
					.catch(error => {
						statusMessage.textContent = errorMessage;
						console.error(error);
					});
			});

			const postData = (body) => {
				return fetch('./server.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				});
			};
		});

	};
	sendForm();
});