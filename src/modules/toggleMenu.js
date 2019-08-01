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

export default toggleMenu;