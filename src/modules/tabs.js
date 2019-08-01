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

export default tabs;