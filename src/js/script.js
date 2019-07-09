window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	let coube = document.querySelector('.coube'),
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
	coubeInterval = requestAnimationFrame(coubeGo);
});
