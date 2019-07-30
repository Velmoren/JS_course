window.addEventListener('DOMContentLoaded', function () {

    const card = document.querySelector('.card'),
        cardContent = document.querySelector('.card-content'),
        dogBtn = document.getElementById('dog'),
        catBtn = document.getElementById('cat'),
        foxBtn = document.getElementById('fox'),
        dogLink = 'https://random.dog/woof.json',
        catLink = 'https://aws.random.cat/meow',
        foxLink = 'https://randomfox.ca/floof/';
    let myElement,
        url;

    card.addEventListener('click', (event) => {
        let target = event.target;
        myElement = target.textContent;
        myElement = myElement.toLowerCase();
        console.log(myElement);
        if (myElement === 'dog') {
            url = dogLink;
        } else if (myElement === 'cat') {
            url = catLink;
        } else if (myElement === 'fox') {
            url = foxLink;
        } else {
            console.error('aaaaaa');
        }

        fetch(url, {
                method: 'GET',
                mode: 'cors', // no-cors, cors, *same-origin
            }).then((response) => {
                // console.log(response);
                return (response.json());
            })
            .then((response) => {
                cardContent.innerHTML = '';
                if (url === dogLink || url === catLink) {

                    if (!/mp4$/.test(response.url) && !/webm$/.test(response.url)) {

                        console.log(response.url);
                        const image = document.createElement('img');
                        if (url === dogLink) {
                            image.setAttribute('src', `${response.url}`);
                        } else if (url === catLink) {
                            image.setAttribute('src', `${response.file}`);
                        }
                        image.setAttribute('alt', `${myElement}`);
                        image.style.cssText = 'width: 100%;';
                        cardContent.appendChild(image);

                    } else {

                        const videoTag = document.createElement('video'),
                            videoContent = document.createElement('source');
                        if (url === dogLink) {
                            videoContent.setAttribute('src', `${response.url}`);
                        } else if (url === catLink) {
                            videoContent.setAttribute('src', `${response.file}`);
                        }
                        videoTag.setAttribute('max-width', `100%`);
                        videoTag.setAttribute('width', '460px');
                        videoTag.setAttribute('controls', 'controls');
                        cardContent.appendChild(videoTag);
                        videoTag.appendChild(videoContent);

                    }

                }
            });

    });

});