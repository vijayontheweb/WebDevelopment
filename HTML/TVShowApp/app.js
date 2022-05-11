const form = document.querySelector('#form');
const query = document.querySelector('#query');
const images = document.querySelector('#images');
const btn = document.querySelector('#btn');

const searchImages = async (evt) => {
    evt.preventDefault()
    images.innerHTML = ""
    console.log('Inside searchImages')
    console.log(form.elements.query.value)
    const imgElement = document.createElement('img');
    await getImages(form.elements.query.value);
};

const getImages = async (query) => {
    try {
        //const headers = { headers: { Accept: 'application/json' } };
        //const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`, headers);
        //Instead of embedding query string in URL, a neat way of constructing similar to headers
        const config = { headers: { Accept: 'application/json' }, params: { q: query } };
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        console.log(res.data.length)
        for (let record of res.data) {
            if (record.show.image) {
                const imgElement = document.createElement('img');
                imgElement.src = record.show.image.medium;
                images.append(imgElement);
            }
        }
    } catch (e) {
        console.log("ERROR! No Images available");
    }
}

form.addEventListener('submit', searchImages);