const list = document.querySelector('#list');
const btn = document.querySelector('#btn');

const addNewJoke = async () => {
    const liElement = document.createElement('li');
    liElement.innerText = await getDadJoke();
    list.append(liElement);
};

const getDadJoke = async () => {
    try {
        const headers = { headers: { Accept: 'application/json' } };
        const res = await axios.get('https://icanhazdadjoke.com', headers);
        return res.data.joke;
    } catch (e) {
        return "ERROR! No Jokes available";
    }
}

btn.addEventListener('click', addNewJoke);