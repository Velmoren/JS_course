'use stricr';

function Elem(text) {
	this.text = text;
}

Elem.prototype.createElem = function() {

	document.write(text);

};

let elem = new Elem('this text');
elem.createElem();
