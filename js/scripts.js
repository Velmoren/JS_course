'use strict';

let date;
let newSpan = document.createElement('span');

// функция добавляет 0 перед значением, если это значение от 0 до 9
let addingZero = function(e) {
    if (e >= 0 && e < 10) {
        return '0' + e;
    } else {
        return e;
    }
};

// каждую секунду Date обновляется и выводит на экран уже новое значение
setInterval(function() {
    date = new Date();
    newSpan.innerHTML = (addingZero(date.getHours()) + ':' + addingZero(date.getMinutes()) + ':' + addingZero(date.getSeconds()) + ' ' +
        addingZero(date.getDate()) + '.' + addingZero((date.getMonth() + 1)) + '.' + date.getFullYear());
    document.body.appendChild(newSpan);
}, 1000);
