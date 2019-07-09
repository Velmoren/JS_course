window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	let coube = document.querySelector('.coube'),
		btn = document.querySelector('#btn'),
		reset = document.querySelector('#reset'),
		count = 0,
		coubeInterval;

	let coubeGo = function() {
		coubeInterval = requestAnimationFrame(coubeGo);
		count++;
		console.log(count);

		if (count < 300) {
			coube.style.left = count + 'px';
		} else if (count < 660) {
			coube.style.transform = 'rotate(' + (count - 299) + 'deg)';
		} else if (count < 960) {
			coube.style.top = (count - 658) + 'px';
		} else {
			cancelAnimationFrame(coubeInterval);
		}
	}

	let myAnimate = true;
	btn.addEventListener('click', function() {
		if (myAnimate) {
			coubeInterval = requestAnimationFrame(coubeGo);
			myAnimate = false;
		} else {
			myAnimate = true;
			cancelAnimationFrame(coubeInterval);
		}
	})
	reset.addEventListener('click', function() {
		count = 0;
		cancelAnimationFrame(coubeInterval);
		myAnimate = true;
		coube.style.left = 0;
		coube.style.top = 0;
		coube.style.transform = 'rotate(' + (0) + 'deg)';

	})

});
