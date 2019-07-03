'use strict'
let selector = prompt('Введите селектор'),
	height = +prompt('Введите высоту (height)'),
	width = +prompt('Введите ширину (width)'),
	bg = prompt('Введите фоновый цвет (background)'),
	fontSize = +prompt('Введите величину текста (font-size)');

function DomElement(selector, height, width, bg, fontSize) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
}

DomElement.prototype.createElem = function() {
	if (this.selector.charAt(0) == '.') {
		let block = document.createElement('div');
		block.className = this.selector;
		block.innerHTML = 'Этот элемент является блоком';
		block.style.cssText = 'height:' + this.height + 'px;' + 'width:' + this.width + 'px;' + 'background:' + this.bg + ';' + 'font-size:' +
			this.fontSize + 'px;'
		document.body.appendChild(block);
	} else if (this.selector.charAt(0) == '#') {
		let paragraph = document.createElement('p');
		paragraph.id = this.selector;
		paragraph.innerHTML = 'Этот элемент является параграфом';
		paragraph.style.cssText = 'height:' + this.height + 'px;' + 'width:' + this.width + 'px;' + 'background:' + this.bg + ';' + 'font-size:' +
			this.fontSize + 'px;';
		document.body.appendChild(paragraph);
	} else {
		document.write('передан неверный селектор');
	}
}

let elem = new DomElement(selector, height, width, bg, fontSize);
console.log(elem);
elem.createElem();
