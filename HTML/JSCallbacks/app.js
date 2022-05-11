//Simple Color Transition
/*
setTimeout(() => {
    body.style.backgroundColor = 'red';
}, 1000);
setTimeout(() => {
    body.style.backgroundColor = 'orange';
}, 2000);
setTimeout(() => {
    body.style.backgroundColor = 'pink';
}, 3000);
*/
//Color transition with Nesting
/*
setTimeout(() => {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = 'orange';
        setTimeout(() => {
            document.body.style.backgroundColor = 'pink';
        }, 1000);
    }, 1000);
}, 1000);
*/

const transitionColor = (newColor, delay, nextFunction) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        nextFunction();
    }, delay);
};

transitionColor('red', 1000, () => {
    transitionColor('orange', 1000, () => {
        transitionColor('yellow', 1000, () => {
        });
    });
});
