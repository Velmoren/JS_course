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
		if (timer.hours >= 10) {
			timerHours.textContent = timer.hours;
		} else {
			timerHours.textContent = "0" + timer.hours;
		}
		if (timer.minutes >= 10) {
			timerMinutes.textContent = timer.minutes;
		} else {
			timerMinutes.textContent = "0" + timer.minutes;
		}
		if (timer.seconds >= 10) {
			timerSeconds.textContent = timer.seconds;
		} else {
			timerSeconds.textContent = "0" + timer.seconds;
		}

		if (timer.seconds == 0) {
			// очищаем setInterval если время вышло
			timerHours.textContent = "24";
			timerMinutes.textContent = "00";
			timerSeconds.textContent = "00";
		}
	}

	let timerInterval = setInterval(updateClock, 1000);

};

export default countTimer;