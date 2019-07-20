'use strict';

const str1 = 'fffkffgffkfdk',
    str2 = 'абвгоогвфф';

const findPalindrome = (str) => {
    let strReal = str,
        strLenght = str.length,
        strTest = str.split('').reverse().join(''),
        arr = [];

    for (let i = 0; i < strLenght; i++) {
        if (strReal[i] === strTest[i]) {
            arr.push(strReal[i]);
        }
    }

    return arr.join('');

};

console.log(findPalindrome(str1));
console.log(findPalindrome(str2));