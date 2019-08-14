'use strict';

const secondSlider = () => {
    const slider = document.querySelector('.services-slider'),
        slide = document.querySelectorAll('.services-slider > .slide');

    // создаем элементы кнопок и стрелки на них
    const arrowNext = document.createElement('div'),
        arrowPrev = document.createElement('div'),
        spanNext = document.createElement('span'),
        spanPrev = document.createElement('span'),
        slideClientWidth = slide[0].clientWidth;

    // так как по классам файла css элементы кнопок - absolute даем нашему слайдеру relative
    slider.style.position = 'relative';

    // добавляем классы для кнопок
    arrowNext.classList.add('slider-arrow');
    arrowNext.classList.add('next');
    arrowPrev.classList.add('slider-arrow');
    arrowPrev.classList.add('prev');

    // вставляем спецсимволы стрелок
    spanNext.innerHTML = '&gt;';
    spanPrev.innerHTML = '&lt;';

    // добавляем элементы на страницу
    slider.appendChild(arrowNext);
    slider.appendChild(arrowPrev);
    arrowNext.appendChild(spanNext);
    arrowPrev.appendChild(spanPrev);

    slider.style.overflow = 'hidden';


    // указываем количество слайдов, после пляшем от этого количества
    // при желании можно адаптировать
    let numberSlide = 5,
        indexSlide = 0;

    const next = () => {
        if (indexSlide === slide.length - numberSlide) {
            indexSlide = 0;
        } else {
            indexSlide++;
        }
        changeSlide();
    };

    const prev = () => {
        if (indexSlide < 1) {
            indexSlide = slide.length - numberSlide;
        } else {
            indexSlide--;
        }
        changeSlide();
    };

    const changeSlide = () => {
        slide.forEach((item) => {
            item.style.transform = `translateX(-${indexSlide * (slideClientWidth + 16)}px)`;
            item.style.marginLeft = '0';
            item.style.marginRight = `16px`;
        });
    };
    changeSlide();

    arrowNext.addEventListener('click', () => {
        next();
    });
    arrowPrev.addEventListener('click', () => {
        prev();
    });
};


export default secondSlider;