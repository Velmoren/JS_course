'use strict'
const myArgument = '   Наша строка такая длинная, что ее пришлось обрезать   ';

var getText = (text) => {
  (typeof (text) !== 'string') ? console.log('Вы ввели не строку'): ((text.trim()).length > 30) ?
    console.log((text.trim()).substring(0, 30) + '...') : console.log((text.trim()));
};
getText(myArgument);