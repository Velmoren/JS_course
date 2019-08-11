'use strict';

const elemCSS = () => {

    const allInputs = document.querySelectorAll('input'),
        allButtons = document.querySelectorAll('button'),
        allLinks = document.querySelectorAll('a');

    allInputs.forEach((item) => {
        item.style.outline = 'none';
    });

    allButtons.forEach((item) => {
        item.style.outline = 'none';
    });

    allLinks.forEach((item) => {
        item.style.outline = 'none';
    });

};

export default elemCSS;