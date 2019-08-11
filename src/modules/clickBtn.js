'use strickt';

const clickBtn = () => {

    const clubsListBtn = document.querySelector('.clubs-list'),
        clubsList = document.querySelector('.clubs-list > ul');

    clubsListBtn.addEventListener('click', () => {
        if (clubsList.style.display !== 'block') {
            clubsList.style.display = 'block';
        } else {
            clubsList.style.display = 'none';
        }
    });
};

export default clickBtn;