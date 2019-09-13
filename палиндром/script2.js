'use strict';

const myVarOne = 'Привет',
	myVarTwo = 'Мир!',
	myButton = document.querySelector('#myButton');

class AlertWindow {
	constructor() {
		this.objVarOne = 5;
		this.objVarTwo = 3;
	}
	objMethodsOne() {
		alert(myObj.objVarOne - myObj.objVarTwo);
	}

	objMethodsTwo() {
		alert(`${myVarOne} ${myVarTwo}`);
	}

	objMethodsThree() {
		myButton.addEventListener('click', () => {
			myObj.objMethodsOne();
			myObj.objMethodsTwo();
		});
	}
}
let myObj = new AlertWindow();
myObj.objMethodsThree();
