// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const ulList = document.querySelector('#list');
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const qty = document.querySelector('#qty');
    const prod = document.querySelector('#product');
    const desc = `${qty.value} ${prod.value}`;
    const liElement = document.createElement('li');
    liElement.innerText = desc;
    const ulList = document.querySelector('#list');
    //ulList.append(liElement);
    console.log(liElement.innerHTML);
    //ulList.innerHTML += liElement.innerHTML
    ulList.innerHTML += `<li>${qty.value} ${prod.value}</li>`;
    qty.value = '';
    prod.value = '';
});