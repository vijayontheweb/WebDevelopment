const btn = document.querySelector('#change');
const container = document.querySelector('#container');

btn.addEventListener('click', (e) => {
    const color = makeRandomColor();
    container.style.backgroundColor = color;
    e.stopPropagation();
});

container.addEventListener('click', () => {
    container.classList.toggle('hide');
});

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}