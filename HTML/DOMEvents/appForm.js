const actionForm = document.querySelector('#actionForm');
actionForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('submitted the form')
    //accessing the text field using id
    const txt = document.querySelector('#txt');
    console.log(txt.value)
    //another way of accessing the text field using name
    console.log(actionForm.elements.inputText.value)
    const liElement = document.createElement('li');
    liElement.innerText = txt.value;
    const ulList = document.querySelector('#list');
    ulList.append(liElement);
    txt.value = '';
})