'use strict';
const smothScroll = () => {

    var ua = window.navigator.userAgent;
    var isIE = /MSIE|Trident/.test(ua);
    const headerBlock = document.querySelector('.head'),
        totopArrow = document.getElementById('totop');
    headerBlock.id = 'scroll';

    if (isIE) {
        const anchors = document.querySelectorAll('[href^="#"]'),
            animationTime = 800,
            framesCount = 20;




        anchors.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                let target = event.target;

                if (target.closest('.active-menu ul')) {

                }
                let myItem = item.getAttribute('href');


                // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
                let coordY = document.querySelector(myItem).getBoundingClientRect().top;

                // запускаем интервал, в котором
                let scroller = setInterval(() => {
                    // считаем на сколько скроллить за 1 такт
                    let scrollBy = coordY / framesCount;
                    // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
                    // и дно страницы не достигнуто
                    if (scrollBy > window.pageYOffset -
                        coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                        // то скроллим на к-во пикселей, которое соответствует одному такту
                        window.scrollBy(0, scrollBy);
                    } else {
                        // иначе добираемся до элемента и выходим из интервала
                        window.scrollBy(0, coordY);
                        clearInterval(scroller);
                    }
                    // время интервала равняется частному от времени анимации и к-ва кадров
                }, animationTime / framesCount);
            });
        });
    }

    if (!isIE) {

        const totop = document.getElementById('totop'),
            headerMain = document.querySelector('.header-main');
        headerMain.id = 'top';
        totop.setAttribute('href', '#top');

        const anchors = document.querySelectorAll('a[href*="#"]');

        for (let anchor of anchors) {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();

                let target = event.target;
                if (target.matches('.open-popup')) {
                    return;
                }
                const blockID = anchor.getAttribute('href');

                document.querySelector('' + blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }

};

export default smothScroll;