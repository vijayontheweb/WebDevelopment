const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const container = document.querySelector("#container");
for (let index = 1; index < 100; index++) {
    const imgURL = `${baseUrl}${index}.png`
    const img = document.createElement('img');
    img.src = imgURL;
    const span = document.createElement('span');
    span.innerText = `#${index}`
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');
    pokemon.appendChild(img);
    pokemon.appendChild(span);
    container.appendChild(pokemon);
}