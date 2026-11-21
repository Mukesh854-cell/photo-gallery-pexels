const textBox = document.querySelector('.text-box');
const searchBtn = document.querySelector('.search');
const gridDiv = document.querySelector('.grid');
const spinner = document.querySelector('.spinner');
const messagePara = document.querySelector('.message');

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
    messagePara.classList.add('hidden');
    let perPage = 12;
    let page = 1;
    let url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&page=${page}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Client-ID ${API_KEY}` }
        });
        console.log(response.status);
        const data = await response.json();

        if (data.results.length === 0) {
            messagePara.classList.remove('hidden');
            messagePara.textContent = 'No photos found. Try another word.';
        } else {
            data.results.forEach((photo) => {
                gridDiv.innerHTML += `
                <div class="card">
                    <img src="${photo.urls.small}" loading="lazy">
                    <p>${photo.user.first_name}</p>
                </div>`
            })
        }
        spinner.classList.add('hidden');

    } catch (error) {
        messagePara.classList.remove('hidden');
        spinner.classList.add('hidden');
        messagePara.textContent = 'Something went wrong. Please try again.';
    }
}
