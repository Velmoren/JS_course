const output = document.getElementById('output');

// функция запроса
const getData = (url) => {
    return new Promise((resolve, reject) => {
        // создаем запрос
        const request = new XMLHttpRequest();


        // настраиваем его
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {

            // если request.readyState - выходим из программы
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                // переменная response - это наши данные
                const response = JSON.parse(request.responseText);
                // вызываем функцию обработки наших данных
                resolve(response);
            } else {
                reject(request.statusText);
            }
        });
        // отправляем
        request.send();
    });

};

/* // используем url с сайта https://jsonplaceholder.typicode.com
const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';

// получаем рандомный объект относительно длины массива данных
const outputPhotos = (data) => {
    const random = Math.floor(Math.random() * data.length);
    const obj = data[random];
    output.innerHTML = `<h4>${obj.title}</h4>
                        <img src="${obj.thumbnailUrl}" alt="${obj.title}">`;
};

// вызываем функцию getData и передаем наши данные
getData(urlPhoto)
    .then(outputPhotos)
    .catch(error => console.error(error)); */


// на примере Promise.All
const oneImage = getData('https://jsonplaceholder.typicode.com/photos/3'),
    twoImage = getData('https://jsonplaceholder.typicode.com/photos/2');

/* const outputPhotos = (data) => {
    output.insertAdjacentHTML('beforebegin',
        `<h4>${data.title}</h4> <img src = "${data.thumbnailUrl}" alt = "${data.title}">`);

}; */

/* // можно вызвать оба промиса так, но вывод данных будет в таком порядке, в каком порядке отработают промисы
oneImage
    .then(outputPhotos)
    .catch(error => console.error(error));
twoImage
    .then(outputPhotos)
    .catch(error => console.error(error)); */

/* // так произойдет вывод только одного промиса, того, что первым отработает
Promise.race([oneImage, twoImage])
    .then(outputPhotos)
    .catch(error => console.error(error)); */

// так выведутся все промисы

const outputPhotos = (data) => {
    data.forEach((item) => {
        output.insertAdjacentHTML('beforebegin',
            `<h4>${item.title}</h4> <img src = "${item.thumbnailUrl}" alt = "${item.title}">`);
    });
};
Promise.all([oneImage, twoImage])
    .then(outputPhotos)
    .catch(error => console.error(error));