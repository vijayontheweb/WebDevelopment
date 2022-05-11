const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');

//OKAYISH
btn2.onclick = () => { console.log('I am called from JS onclick - arrow function'); }
//THIS WILL NOT WORK AS YOU CANNOT EXECUTE IT DIRECTLY
// btn2.onclick = alert('Hi')
//RATHER IT SHOULD BE ASSIGNED TO FUNCTION
//btn2.onclick = function () { console.log('I am called from JS onclick - anonymous function'); }
btn2.onmouseenter = yell
function yell() {
    console.log("YOU'RE HOVERING OVER ME!");
}
//RECOMMENDED
btn3.addEventListener('click', () => { console.log('I am called from JS addEventListener') });