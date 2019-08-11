'use strict';

const sendForm = () => {

    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = `Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.`;

    const statusMessage = document.createElement('p'),
        formArr = document.querySelectorAll('form'),
        priceMessage = document.querySelector('.price-message>input'),
        priceCard = document.getElementById('price-total'),
        popup = document.getElementById('thanks');

    //на случай, если человек не знает про промокод 
    if (priceMessage) {
        priceMessage.removeAttribute('required');
    }

    formArr.forEach((item) => {
        item.addEventListener('input', (elem) => {

            // валидация, если не необходима - закоментил
            if (elem.target.name === 'name' && elem.target !== priceMessage) {
                elem.srcElement.value = elem.srcElement.value.replace(/[^а-яА-ЯёЁ ]/gi, ``);
            } else if (elem.target.name === 'tel') {
                // elem.srcElement.value = elem.srcElement.value.replace(/[^0-9+]/gi, ``);
            } else if (elem.target.name === 'user_email') {
                // валидацию формы оставил на десерт :))
                // elem.srcElement.value = elem.srcElement.value.replace(/^\w+@\w+\.\w+$/g, ``);
            } else if (elem.target.name === 'message') {
                elem.srcElement.value = elem.srcElement.value.replace(/[^а-яА-ЯёЁ ]/gi, ``);
            } else {
                return;
            }

        });

        item.addEventListener('submit', (event) => {
            event.preventDefault();

            // по ТЗ после отправки этой формы все содержимое формы заменяется на текст благодарности
            if (item.id === 'form1') {

                statusMessage.style.cssText =
                    'font-size: 20px; color: white; width: 90%; font-weight: 500; margin-top: 30px;';

                document.querySelectorAll('#form1>p, #form1>button').forEach((item) => {
                    item.style.display = 'none';
                });

                item.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
            }

            // формируем FormData
            const formData = new FormData(item);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            // отсекаем контент других страниц и добавляем в тело данных данные из доп.полей
            if (!document.querySelector('html').id) {
                if (priceMessage.value && item.id === 'card_order') {
                    body[`promo_code`] = priceMessage.value;
                    priceMessage.value = '';
                }

                if (priceCard.textContent && item.id === 'card_order') {
                    body[`price_totlal`] = priceCard.textContent;
                    priceCard.textContent = '1999';
                }
            }


            postData(body)
                .then((response) => {
                    setTimeout(() => {
                        if (response.status !== 200) {
                            statusMessage.textContent = errorMessage;
                            throw new Error('status network not 200');
                        }

                        const myInputs = item.querySelectorAll('input');

                        myInputs.forEach((elem) => {
                            if (elem.type === 'text' || elem.type === 'tel') {
                                elem.value = '';
                            }
                        });

                        // если это форма, в которой нужно менять контент - меняем, иначе открываем модалку-спасибку
                        if (item.id === 'form1') {
                            statusMessage.textContent = successMessage;
                        } else {
                            statusMessage.remove();
                            popup.style.display = 'block';
                        }
                    }, 1000);
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };
    });

};

export default sendForm;