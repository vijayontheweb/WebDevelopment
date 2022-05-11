const btns = document.querySelectorAll('button');
const h2s = document.querySelectorAll('h2');

/*
for (let btn of btns) {
    btn.addEventListener('click', () => {
        const color = makeRandomColor();
        btn.style.backgroundColor = color;
    });
}

for (let h2 of h2s) {
    h2.addEventListener('click', () => {
        const color = makeRandomColor();
        h2.style.backgroundColor = color;
    });
}
*/

for (let btn of btns) {
    btn.addEventListener('click', applyColor);
}

for (let h2 of h2s) {
    h2.addEventListener('click', applyColor);
}

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function applyColor() {
    const color = makeRandomColor();
    this.style.backgroundColor = color;
}