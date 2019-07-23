const longestPalindrome = (myString) => {
	myString = myString.replace(/\s/g, ``);
	let length = myString.length,
		result = ``;

	const centeredPalindrome = (left, right) => {
		while (left >= 0 && right < length && myString[left] === myString[right]) {

			left--;
			right++;
		}
		return myString.slice(left + 1, right);
	};

	for (let i = 0; i < length - 1; i++) {
		let oddPal = centeredPalindrome(i, i + 1),
			evenPal = centeredPalindrome(i, i);
		if (oddPal.length > result.length) {
			result = oddPal;
		}
		if (evenPal.length > result.length) {
			result = evenPal;
		}

	}
	return result;
};
console.log(longestPalindrome(`fffkffgffkfdk`));
console.log(longestPalindrome(`абвгоогвфф`));
console.log(longestPalindrome(`ывйцшзщшгшалашнекуцйдлорпавырпна`));
console.log(longestPalindrome(`от сила типа капиталистов`));
