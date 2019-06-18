'use strict';

let books = document.querySelectorAll('.book'),
    booksBox = document.querySelector('.books'),
    body = document.querySelector('body'),
    booksTitle = document.querySelectorAll('.book h2 a'),
    advertising = document.querySelector('.adv'),
    booksLists = document.querySelectorAll('.book ul'),
    booksListsItems = document.querySelectorAll('.book ul li');

// функция смены очередности элементов в коллекции
let changeAntecedency = function(collect, a, b) {
    collect.insertBefore(a, b);
};

// функция изменения передаваемого атрибута в передаваемом элементе на передаваемое значение
let changeAttributes = function(element, attributesName, attributesValue) {
    element.setAttribute(attributesName, attributesValue);
};

// функция замены текстового содержимого в элементе
let changeText = function(element, text) {
    element.textContent = text;
};

// вызовы функций
// меняем очередность книг
changeAntecedency(booksBox, books[1], books[0]);
changeAntecedency(booksBox, books[4], books[3]);
changeAntecedency(booksBox, books[2], null);

// меняем свойства элементов
changeAttributes(body, 'style', 'background-image: url(./image/you-dont-know-js.jpg)');
changeText(booksTitle[4], 'Книга 3. this и Прототипы Объектов');
changeAttributes(advertising, 'style', 'display: none');

// выравнивание глав книги 2
changeAntecedency(booksLists[0], booksListsItems[2], booksListsItems[10]);
changeAntecedency(booksLists[0], booksListsItems[7], booksListsItems[9]);
changeAntecedency(booksLists[0], booksListsItems[6], booksListsItems[4]);
changeAntecedency(booksLists[0], booksListsItems[8], booksListsItems[4]);

// выравнивание глав книги 5
changeAntecedency(booksLists[5], booksListsItems[54], booksListsItems[56]);
changeAntecedency(booksLists[5], booksListsItems[51], booksListsItems[54]);
changeAntecedency(booksLists[5], booksListsItems[53], booksListsItems[51]);
changeAntecedency(booksLists[5], booksListsItems[52], booksListsItems[53]);
changeAntecedency(booksLists[5], booksListsItems[48], booksListsItems[52]);
changeAntecedency(booksLists[5], booksListsItems[55], booksListsItems[49]);

// добавляем главу 8 в книгу 6
let newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6'
booksLists[2].appendChild(newChapter);
booksListsItems = document.querySelectorAll('.book ul li');
changeAntecedency(booksLists[2], booksListsItems[57], booksListsItems[56]);
