const output = document.getElementById('output');

// функция запроса
const getData = (url, outputData) => {
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
            outputData(response);
        } else {
            console.error(request.statusText);
        }
    });
    // отправляем
    request.send();
};

// получаем рандомный объект относительно длины массива данных
const outputPhotos = (data) => {
    const random = Math.floor(Math.random() * data.length);
    const obj = data[random];
    output.innerHTML = `<h2>${obj.title}</h2>
                        <img src="${obj.url}" alt="${obj.title}">`;


};
// используем url с сайта https://jsonplaceholder.typicode.com
const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';
// вызываем функцию getData и передаем наши данные
getData(urlPhoto, outputPhotos);