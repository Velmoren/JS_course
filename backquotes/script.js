'use strict';

let strOne = 'У меня',
    strTwo = 'в коде',
    strThree = 'багов!',
    numOne = 2,
    numTwo = 16,
    numThree = 28;

const countOne = (myvar) => {
    const varOne = document.querySelector(`.${myvar}-item`);

    console.log(varOne);



};
countOne(`income`);
countOne(`expenses`);