'use strict';

const photoWrap = document.querySelector('.photo'),
    filter = document.querySelector('.filter'),
    title = document.querySelector('.title');    

const getHeroes = () => {
    fetch('./dbHeroes.json')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(elem => {
                const cardWrap = document.createElement('div'),
                    persWrap = document.createElement('div'),
                    photo = document.createElement('img'),
                    persInfo = document.createElement('p'),
                    {actors, name, realName, status, movies} = elem;
                
                photo.classList.add('img');
                cardWrap.classList.add('cardWrap');
                persWrap.classList.add('persWrap');
                photoWrap.appendChild(cardWrap);
                cardWrap.appendChild(persWrap);
                persWrap.appendChild(photo);
                
                persInfo.innerHTML = `<span>Actor:</span> ${actors}<br>
                                        <span>Name:</span> ${name}<br>
                                        <span>Real Name:</span> ${realName}<br>
                                            <span>Status:</span> ${status}<br>
                                        <span>Movies:</span> ${movies}`;
                persWrap.appendChild(persInfo);
                photo.src = elem.photo;
                
                filter.addEventListener('click', event => {
                    cardWrap.style.display = 'none';
                    if (movies){
                        for (let key of movies) {
                            if (event.target.textContent === key) {
                                title.textContent = key;
                                cardWrap.style.display = 'block';
                            }
                        }
                    }
                }); 
            });  
        })
        .catch(error => {
            console.error(error);
        });
};

getHeroes();