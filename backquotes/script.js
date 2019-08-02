'use strict';

let strOne = 'У меня',
    strTwo = 'в коде',
    strThree = 'багов!',
    numOne = 2,
    numTwo = 16,
    numThree = 27;


const countThree = (myPraram) => {
    const blockThree = document.querySelector(`.${myPraram}-item`);

    let blockText = blockThree.textContent;
    blockText = blockText / 2;
    blockThree.textContent = blockText;

};

countThree('expenses');
countThree('income');

// надеюсь вам это поможет))