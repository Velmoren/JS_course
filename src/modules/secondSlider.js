'use strict';

const secondSlider = () => {

    const slider = document.querySelector('.services-slider'),
        slide = document.querySelectorAll('.services-slider > .slide');

    // создаем элементы кнопок и стрелки на них
    const arrowNext = document.createElement('div'),
        arrowPrev = document.createElement('div'),
        spanNext = document.createElement('span'),
        spanPrev = document.createElement('span');

    // так как по классам файла css элементы кнопок - absolute даем нашему слайдеру relative
    slider.style.position = 'relative';

    // добавляем классы для кнопок
    arrowNext.classList.add('slider-arrow', 'next');
    arrowPrev.classList.add('slider-arrow', 'prev');

    // вставляем спецсимволы стрелок
    spanNext.innerHTML = '&gt;';
    spanPrev.innerHTML = '&lt;';

    // добавляем элементы на страницу
    slider.appendChild(arrowNext);
    slider.appendChild(arrowPrev);
    arrowNext.appendChild(spanNext);
    arrowPrev.appendChild(spanPrev);

    // указываем количество слайдов, после пляшем от этого количества
    // при желании можно адаптировать
    let numberSlide = 5,
        // и обьявляем переменную index равную количенству слайдов
        index = numberSlide;

    // перебираем все слайды и удаляем лишние.
    slide.forEach((item, index) => {
        if (index > numberSlide - 1) {
            slider.removeChild(item);
        }
    });

    const prevSlide = () => {
        // заносим в переменную все существующие на странице слайды
        const activeSlide = slider.querySelectorAll('.slide');
        // указываем индекс последнего элемента
        let indexLast = index;
        // удаляем первый слайд существующий на странице и добавляем в конец слайд следующий по индексу полученный ранее
        slider.removeChild(activeSlide[0]);
        slider.appendChild(slide[indexLast]);

        // увеличиваем undex на единицу
        index++;

        // и если индекс последнего элемента равен индексу последнего элемента в списке полученном ранее
        // обнуляем index
        if (indexLast === slide.length - 1) {
            index = 0;
        }
    };

    const nextSlide = () => {
        // заносим в переменную все существующие на странице слайды
        const activeSlide = slider.querySelectorAll('.slide');
        // увеличиваем undex на единицу
        index--;
        // указываем индекс первого элемента и высчитываем его
        let indexFirst;

        if (index <= -1) {
            indexFirst = index - numberSlide;
        } else {
            indexFirst = index;
        }

        if (indexFirst <= -1) {
            indexFirst = slide.length - 1;
            index = slide.length - 1;
        }
        slider.removeChild(activeSlide[numberSlide - 1]);
        slider.insertBefore(slide[indexFirst], slider.firstChild);
    };

    arrowPrev.addEventListener('click', () => {
        prevSlide();
    });

    arrowNext.addEventListener('click', () => {
        nextSlide();
    });

};

export default secondSlider;