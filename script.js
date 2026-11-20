const textBox = document.querySelector('.text-box');
const searchBtn = document.querySelector('.search');
const gridDiv = document.querySelector('.grid');
const spinner = document.querySelector('.spinner');

searchBtn.addEventListener('click', () => {
    const trimmedTextBox = textBox.value.trim();
    if (trimmedTextBox === '') {
        console.log('Type something');
    } else {
        gridDiv.innerHTML = '';
        photosFunc(trimmedTextBox);
    }
    textBox.value = '';
})

async function photosFunc(query) {
    spinner.classList.remove('hidden');
    let perPage = 12;
    let page = 1;
    let url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&page=${page}`;
    console.log(url);

    const response = await fetch(url, {
        headers: { Authorization: `Client-ID ${API_KEY}` }
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data.results[0].urls.small);
    console.log(data.results[0].user.first_name);

    // data.results.forEach((photo) => {
    //     const cardDiv = document.createElement('div');
    //     cardDiv.classList.add('card');
    //     const imgDiv = document.createElement('img');
    //     imgDiv.src = photo.urls.small;
    //     const paraName = document.createElement('p');
    //     paraName.textContent = photo.user.first_name;
    //     cardDiv.appendChild(imgDiv);
    //     cardDiv.appendChild(paraName);
    //     gridDiv.appendChild(cardDiv);
    // });

    data.results.forEach((photo) => {
        gridDiv.innerHTML += `
        <div class="card">
            <img src="${photo.urls.small}" loading="lazy">
            <p>${photo.user.first_name}</p>
        </div>`
    })
    spinner.classList.add('hidden');
}
