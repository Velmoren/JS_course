'use strict';
const smothScroll = () => {

    const ua = window.navigator.userAgent;
    const isIE = /MSIE|Trident/.test(ua);

    if (isIE) {
        const anchors = document.querySelectorAll('a[href^="#"]');

        anchors.forEach((item) => {

            item.addEventListener('click', (event) => {
                event.preventDefault();
                let target = event.target;
                requestAnimationFrame(step);

                let speed = 0.2,
                    startScroll = window.pageYOffset,
                    myItem = item.getAttribute('href'),
                    finishScroll = document.querySelector(myItem).getBoundingClientRect().top,
                    start = null;

                function step(time) {
                    // в первый кадр запомним время старта
                    if (start === null) {
                        start = time;
                    }
                    let progress = time - start, // определить, сколько прошло времени с начала анимации
                        nowScroll = null; // текущее положение сколла

                    // в зависимости от того двигаемся вверх или вниз, определим текущее положение сколла
                    if (finishScroll < 0) {
                        nowScroll = Math.max(startScroll - progress / speed, startScroll + finishScroll);
                    } else {
                        nowScroll = Math.min(startScroll + progress / speed, startScroll + finishScroll);
                    }
                    // прокрутим скролл
                    window.scrollTo(0, nowScroll);
                    // если прокрутка еще не окончена, повторим шаг
                    if (nowScroll != startScroll + finishScroll) {
                        requestAnimationFrame(step); // запланировать отрисовку следующего кадра
                    }
                }
            });
        });
    } else {
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