const sendForm = () => {

    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const formArr = document.querySelectorAll('form');

    formArr.forEach((item) => {
        item.addEventListener('input', (elem) => {

            // валидация 
            if (elem.target.name === 'user_name') {
                elem.srcElement.value = elem.srcElement.value.replace(/[^а-яА-ЯёЁ ]/gi, ``);
            } else if (elem.target.name === 'user_phone') {
                elem.srcElement.value = elem.srcElement.value.replace(/[^0-9+]/gi, ``);
            } else if (elem.target.name === 'user_email') {
                // валидацию формы оставил на десерт :))
                // elem.srcElement.value = elem.srcElement.value.replace(/^\w+@\w+\.\w+$/g, ``);
            } else if (elem.target.name === 'user_message') {
                elem.srcElement.value = elem.srcElement.value.replace(/[^а-яА-ЯёЁ ]/gi, ``);
            } else {
                return;
            }

        });
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white';

        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(item);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then((response) => {
                    setTimeout(() => {
                        if (response.status !== 200) {
                            statusMessage.textContent = errorMessage;
                            throw new Error('status network not 200');
                        }
                        const myInputs = item.querySelectorAll('input');

                        myInputs.forEach((elem) => {
                            elem.value = '';
                        });

                        statusMessage.textContent = successMessage;
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