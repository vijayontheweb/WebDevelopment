//---------------------------------------------------------------------------------------------
// ASYNC
//---------------------------------------------------------------------------------------------

const login = async (username, password) => {
    if (!username || !password) {
        throw new Error('Missing Credentials!');
    } else if (username == "vijay" && password == "anand") {
        return "Welcome vijay. Have a nice day!";
    } else {
        throw new Error('Invalid Credentials!');
    }
}

login('vijay', 'anand').
    then((message) => {
        console.log('Login Sucessful! ' + message);
    }).catch((error) => {
        console.log('Login Failed! ' + error);
    });

//---------------------------------------------------------------------------------------------
// AWAIT
//---------------------------------------------------------------------------------------------
const changeBodyColor = async (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay);
    });
}

//No transition observed
const rainbowWithoutAwait = () => {
    changeBodyColor('red', 1000);
    changeBodyColor('orange', 1000);
    changeBodyColor('yellow', 1000);
    changeBodyColor('green', 1000);
    changeBodyColor('blue', 1000);
    changeBodyColor('indigo', 1000);
    changeBodyColor('violet', 1000);
}

//Transition observed since await will wait
const rainbowWithAwait = async () => {
    await changeBodyColor('red', 1000);
    await changeBodyColor('orange', 1000);
    await changeBodyColor('yellow', 1000);
    await changeBodyColor('green', 1000);
    await changeBodyColor('blue', 1000);
    await changeBodyColor('indigo', 1000);
    await changeBodyColor('violet', 1000);
    return "All done!"
}

rainbowWithAwait().then((message) => {
    console.log("Rainbow Status - " + message)
});

//---------------------------------------------------------------------------------------------
// HANDLING ERRORS IN ASYNC - USE TRY / CATCH
//---------------------------------------------------------------------------------------------
const fakeAsyncRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4000);
        setTimeout(() => {
            if (delay > 1000) {
                resolve(`Success..${url}`);
            } else {
                reject("Connection timeout!");
            }
        }, delay);
    });
}


const makeAsyncRequests = async () => {
    try {
        let message = await fakeAsyncRequest('books.com/page1');
        console.log(message);
        message = await fakeAsyncRequest('books.com/page2');
        console.log(message);
        message = await fakeAsyncRequest('books.com/page3');
        console.log(message);
    } catch (e) {
        console.log('Error -> ' + e)
    }
}

makeAsyncRequests();
