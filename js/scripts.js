'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let newDiv;
let date = new Date();

// функция вывода на экран обычного текста
let getDayOfRest = function(day) {
    newDiv = document.createElement('span');
    newDiv.innerHTML = day + '<br>';
    document.body.appendChild(newDiv);
};
// функция вывода на экран текста курсивом
let getWeekday = function(day) {
    newDiv = document.createElement('i');
    newDiv.innerHTML = day + '<br>';
    document.body.appendChild(newDiv);
};
// функция вывода на экран жирного текста
let getNowDay = function(day) {
    newDiv = document.createElement('span');
    newDiv.innerHTML = '<b>' + day + '</b><br>';
    document.body.appendChild(newDiv);
};

for (let i = 0; i < week.length; i++) {
    // в цикле первым делом проверяем, совпадает ли индекс массива с номером реального дня недели и если так,
    //  то передаем значение массива в функцию вывода жирным цветом
    if ([i] == date.getDay()) {
        getNowDay(week[i]);
        console.log(week[i] + ' now day');
    } else {
        // если индекс массива не совпадает с реальным днем недели - проверяем на выходной день и выводим в зависимости от ответа
        if ([i] == 5 || [i] == 6) {
            getWeekday(week[i]);
        } else {
            getDayOfRest(week[i]);
        }
    }
}
