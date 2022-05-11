const userName = document.querySelector('#username');
const h1 = document.querySelector('h1');
userName.addEventListener('input', (evt) => {
    const text = userName.value;
    if (text == '') {
        h1.innerText = 'Enter Your Username'
    } else {
        h1.innerText = 'Welcome, ' + text;
    }
});