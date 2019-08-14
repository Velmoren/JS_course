'use strict';

const calc = () => {

    // если у html страницы отсутствует ID (избегаем ошибок на других страницах с теми же классами и формами)
    if (document.querySelector('html').id === 'hero-html') {

        const cardLetoMozaika = document.getElementById('card_leto_mozaika'),
            cardLetoSchelkovo = document.getElementById('card_leto_schelkovo'),
            cardOrderForm = document.getElementById('card_order'),
            priceTotal = document.getElementById('price-total'),
            discountInput = document.querySelector('#card_order>.price>.input-text>input'),
            cardType = cardOrderForm.querySelectorAll('input[name="card-type"]');

        // если на странице существует discountInput
        let discount = 0;
        if (discountInput) {

            discountInput.addEventListener('keyup', (event) => {
                const target = event.target;

                // если введен промокод - отнимаем от суммы 30%
                if (target.value === 'ТЕЛО2019') {
                    discount = 30;
                    countSum();
                } else {
                    discount = 0;
                    countSum();
                }
            });
        }

        // если на странице существует priceTotal то сразу ставим в него значение по умолчанию выбранных radio
        if (priceTotal) {
            priceTotal.textContent = 1999;
        }

        const countSum = () => {

            let total = 0,
                priseCard = 0;
            // если выбрана радио-кнопка Schelkovo назначаем цены карточкам
            if (cardLetoSchelkovo.checked) {
                cardType.forEach((item) => {
                    if (item.checked) {
                        if (item.value == 1) {
                            priseCard = 2990;
                        }
                        if (item.value == 6) {
                            priseCard = 14990;
                        }
                        if (item.value == 9) {
                            priseCard = 21990;
                        }
                        if (item.value == 12) {
                            priseCard = 24990;
                        }
                    }
                });
                // иначе если выбрана радио-кнопка Mozaika назначаем цены карточкам
            } else if (cardLetoMozaika.checked) {
                cardType.forEach((item) => {
                    if (item.checked) {
                        if (item.value == 1) {
                            priseCard = 1999;
                        }
                        if (item.value == 6) {
                            priseCard = 9900;
                        }
                        if (item.value == 9) {
                            priseCard = 13900;
                        }
                        if (item.value == 12) {
                            priseCard = 19900;
                        }
                    }
                });
            }

            // высчитываем стоимость с учетом скидки и округляем в большую сторону
            total = Math.ceil(priseCard * (1 - (discount / 100)));
            // заносим результат в блок с текстом
            priceTotal.textContent = total;
        };

        // вешаем обработчик события и ловим изменения всех инпутов типа текст
        cardOrderForm.addEventListener('change', (event) => {
            let target = event.target;

            if (target.matches('input[type="radio"]')) {
                countSum();
            } else {
                return;
            }
        });
    }
};

export default calc;