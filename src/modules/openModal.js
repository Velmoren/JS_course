'use strict';

const openModal = () => {

    const callbackForm = document.getElementById('callback_form'),
        freeVisitForm = document.getElementById('free_visit_form'),
        giftForm = document.getElementById('gift'),
        thanksModal = document.getElementById('thanks'),
        callbackBtn = document.querySelectorAll('.callback-btn'),
        fixedGift = document.querySelector('.fixed-gift');

    document.body.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('open-popup')) {
            freeVisitForm.style.display = 'block';
        } else if (target === callbackBtn[0]) {
            callbackForm.style.display = 'block';
        } else if (target.closest('.fixed-gift')) {
            giftForm.style.display = 'block';
            fixedGift.style.display = 'none';
        } else if (target.classList.contains('overlay') ||
            target.closest('.close-form') ||
            target.classList.contains('close-btn')) {

            // чтоб избежать ошибок на других страницах если данные модальные окна 
            // отсутствуют там - сперва проверяем, суцществует ли элемент
            if (freeVisitForm) {
                freeVisitForm.style.display = 'none';
            }
            if (callbackForm) {
                callbackForm.style.display = 'none';
            }
            if (thanksModal) {
                thanksModal.style.display = 'none';
            }
            if (giftForm) {
                giftForm.style.display = 'none';
            }

        } else {
            return;
        }
    });

};

export default openModal;