'use strict';

const firstSlider = () => {

    const slider = document.querySelector('.main-slider'),
        slide = document.querySelectorAll('.main-slider>.slide');

    // создаем кнопки пагинации исходя из классов css файла столько, сколько у нас слайдов
    const ul = document.createElement('ul');
    ul.classList.add('slider-dots');
    ul.style.zIndex = 1002;
    slider.appendChild(ul);

    for (let i = 0; i < slide.length; i++) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('dot-btn');
        if (i == 0) {
            // и первую кнопку делаем активной
            li.classList.add('slick-active', 'dot');
            li.style.cursor = 'pointer';
            ul.appendChild(li);
            li.appendChild(button);
        } else {
            li.classList.add('dot');
            li.style.cursor = 'pointer';
            ul.appendChild(li);
            li.appendChild(button);
        }
    }
    // после получаем созданые элементы для дальнейшего использования
    const dot = document.querySelectorAll('.main-slider>ul>li'),
        dotBtn = document.querySelectorAll('.main-slider>ul>li>button'),
        dotBlock = document.querySelector('.main-slider>ul');

    let currentSlide = 0,
        interval,
        userTimer = 1500;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
        if (elem === slide) {
            elem[index].style.display = 'none';
        }
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
        if (elem === slide) {
            elem[index].style.display = 'flex';
        }
    };

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'slick-active');
        prevSlide(dot, currentSlide, 'slick-active');

        currentSlide++;

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        nextSlide(slide, currentSlide, 'slick-active');
        nextSlide(dot, currentSlide, 'slick-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    startSlide(userTimer);

    dotBlock.addEventListener('click', (event) => {
        let target = event.target,
            indexTarget;

        // проверяем индекс таргета и заносим в переменную indexTarget
        dot.forEach((item, index) => {
            if (target === item) {
                indexTarget = index;
            }
        });

        dotBtn.forEach((item, index) => {
            if (target === item) {
                indexTarget = index;
            }
        });

        if (target.closest('.dot')) {

            prevSlide(slide, currentSlide, 'slick-active');
            prevSlide(dot, currentSlide, 'slick-active');

            // делаем активный слайд по индексу таргета
            currentSlide = indexTarget;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'slick-active');
            nextSlide(dot, currentSlide, 'slick-active');
        } else {
            return;
        }
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.slider-dots') || event.target.matches('.dot')) {
            stopSlide();
        } else {
            return;
        }

    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.slider-dots') || event.target.matches('.dot')) {
            startSlide(userTimer);
        } else {
            return;
        }
    });

};

export default firstSlider;