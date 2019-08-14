'use strict';

const thirdSlider = () => {

    const slider = document.querySelector('.gallery-slider'),
        slide = slider.querySelectorAll('.slide');


    const arrowNext = document.createElement('div'),
        arrowPrev = document.createElement('div'),
        spanNext = document.createElement('span'),
        spanPrev = document.createElement('span');

    let currentSlide = 0,
        interval,
        userTimer = 3000;

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

    // добавляем dot переключатели слайдера
    const ul = document.createElement('ul');
    ul.classList.add('slider-dots');
    ul.style.zIndex = 1002;
    slider.appendChild(ul);

    for (let i = 0; i < slide.length; i++) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('dot-btn');
        if (i == 0) {
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
    const dot = document.querySelectorAll('.gallery-slider>ul>li'),
        dotBtn = document.querySelectorAll('.gallery-slider>ul>li>button');

    // скрываем все слайды кроме первого
    slide.forEach((item, index) => {
        if (index === 0) {
            item.classList.add('active-slide');
        } else {
            item.style.display = 'none';
        }
    });

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
        if (elem === slide) {
            elem[index].style.display = 'none';
        }
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
        if (elem === slide) {
            elem[index].style.display = 'block';
        }
    };

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'active-slide');
        prevSlide(dot, currentSlide, 'slick-active');

        currentSlide++;

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'active-slide');
        nextSlide(dot, currentSlide, 'slick-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();

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

        if (!target.closest('.slider-arrow, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'active-slide');
        prevSlide(dot, currentSlide, 'slick-active');

        if (target.closest('.next')) {
            currentSlide++;
        } else if (target.closest('.prev')) {
            currentSlide--;
        } else if (target.closest('.dot') || target.closest('.dot button')) {
            currentSlide = indexTarget;
        } else {
            return;
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'active-slide');
        nextSlide(dot, currentSlide, 'slick-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.closest('.slider-arrow') || event.target.closest('.dot')) {
            stopSlide();
        } else {
            return;
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.closest('.slider-arrow') || event.target.closest('.dot')) {
            startSlide(userTimer);
        } else {
            return;
        }
    });

    startSlide(userTimer);

};

export default thirdSlider;