window.addEventListener('DOMContentLoaded', function() {
	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
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

		paragraphDay.innerHTML = `Сегодня: ${days[myDate.getDay()]}`;
		paragraphTime.innerHTML = `Текущее время: ${myTime}`;
		paragraphNewYear.innerHTML = `До нового года осталось ${myDayToNewYear.day} дней`;
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
