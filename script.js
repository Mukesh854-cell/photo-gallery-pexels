const textBox = document.querySelector('.text-box');
const searchBtn = document.querySelector('.search');
const gridDiv = document.querySelector('.grid');

console.log(gridDiv);

async function photosFunc() {
    let query = 'nature';
    let perPage = 12;
    let page = 1;
    let url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&page=${page}`;
    console.log(url);
    
    const response = await fetch(url, {
        headers: {Authorization: `Client-ID ${API_KEY}`}
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
            <img src="${photo.urls.small}">
            <p>${photo.user.first_name}</p>
        </div>`
    })
}

photosFunc();