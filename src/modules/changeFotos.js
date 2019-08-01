const changeFotos = () => {
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

export default changeFotos;