//---------------------------------------------------------------------------------------------
//randomColors
//---------------------------------------------------------------------------------------------
const h1 = document.querySelector('h1');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    const color = makeRandomColor();
    document.body.style.backgroundColor = color;
    h1.innerText = color;
});

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}