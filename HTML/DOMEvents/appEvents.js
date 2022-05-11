const btn = document.querySelector('button');
btn.addEventListener('click', (evt) => {
    alert('You clicked me!');
    console.log(evt);
})

const ip = document.querySelector('input')
ip.addEventListener('keydown', (evt) => {
    console.log('KEY DOWN')
    console.log(evt.key)
    console.log(evt.code)
})

ip.addEventListener('keyup', (evt) => {
    console.log('KEY UP')
})

//Global way
window.addEventListener('keydown', (evt) => {
    console.log('WINDOW KEY DOWN')
    console.log(evt.key)
    console.log(evt.code)
    switch (evt.code) {
        case 'ArrowRight':
            console.log('ARROW KEY RIGHT');
            break;
        case 'ArrowLeft':
            console.log('ARROW KEY LEFT');
            break;
        case 'ArrowUp':
            console.log('ARROW KEY UP');
            break;
        case 'ArrowDown':
            console.log('ARROW KEY DOWN');
            break;
        default:
            console.log('IGNORE');
    }
})

window.addEventListener('keyup', (evt) => {
    console.log('WINDOW KEY UP')
})