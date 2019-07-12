window.addEventListener('DOMContentLoaded', function() {
	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		paragraphHours = document.createElement('p'),
		paragraphDay = document.createElement('p'),
		paragraphTime = document.createElement('p'),
		paragraphNewYear = document.createElement('p');

	function updateTime() {
		let myDate = new Date(),
			myTime = myDate.toLocaleString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: true
			}),
			myDayToNewYear = countTimer('01 01 2020');

		let nowHoursDay = myDate.getHours();
		if (nowHoursDay >= 0 && nowHoursDay < 6) {
			paragraphHours.innerHTML = `Доброй ночи`;
		} else if (nowHoursDay >= 6 && nowHoursDay < 12) {
			paragraphHours.innerHTML = `Доброе утро`;
		} else if (nowHoursDay >= 12 && nowHoursDay < 18) {
			paragraphHours.innerHTML = `Добрый день`;
		} else if (nowHoursDay >= 18 && nowHoursDay < 12) {
			paragraphHours.innerHTML = `Добрый вечер`;
		} else {
			paragraphHours.innerHTML = `Мы вне времени, сударь`;
		}
		paragraphDay.innerHTML = `Сегодня: ${days[myDate.getDay()]}`;
		paragraphTime.innerHTML = `Текущее время: ${myTime}`;
		paragraphNewYear.innerHTML = `До нового года осталось ${myDayToNewYear.day} дней`;

		document.body.appendChild(paragraphHours);
		document.body.appendChild(paragraphDay);
		document.body.appendChild(paragraphTime);
		document.body.appendChild(paragraphNewYear);

		function countTimer(deadline) {
			let dateStop = new Date(deadline).getTime(),
				dateNow = myDate.getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				day = Math.floor(timeRemaining / 60 / 60 / 24);
			return { timeRemaining, day }
		}
		if (myDayToNewYear.timeRemaining < 0) {
			paragraphNewYear.innerHTML = `До нового года осталось ${0} дней`;
		}
	}
	setInterval(updateTime, 1000);
});
