'use strict';

const accBtns = document.querySelectorAll('.acc-btn');
// переберем все блоки аккордиона и навесим обработчик на цель клика
accBtns.forEach((item) => {
    item.addEventListener('click', (event) => {

        item.classList.toggle('is-open');
        let content = item.nextElementSibling;

        if (content.style.maxHeight) {
            // если аккордион открыть - закроем его
            content.style.maxHeight = null;
        } else {
            // если аккордион закрыт - откроем
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        // переберем еще раз все блоки аккордиона и закроем остальные если они были открыты
        accBtns.forEach((item) => {
            if (item !== event.target) {
                let contentOtherAcc = item.nextElementSibling;
                contentOtherAcc.style.maxHeight = null;
            }
        });
    });
});