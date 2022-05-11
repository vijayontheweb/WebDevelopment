const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject(`Connection Timeout`);
            } else {
                resolve(`Here is your fake data from ${url}`);
            }
        }, delay);
    });

}

/*
let response = fakeRequestPromise('books.com');
response.then((successMsg) => {
        console.log(`Success! parameterized  message`);
        console.log(successMsg);
    }
).catch((failureMsg) => {
        console.log(`Error! parameterized  message`);
        console.log(failureMsg);
    }		
);
*/

//make another request only if the first request is successful - NESTED
/*
fakeRequestPromise('books.com/page1')
    .then((successMsg) => {
        console.log(`Success! parameterized  message #1`);
        console.log(successMsg);
        fakeRequestPromise('books.com/page2')
            .then((successMsg) => {
                console.log(`Success! parameterized  message #2`);
                console.log(successMsg);
                fakeRequestPromise('books.com/page3')
                    .then((successMsg) => {
                        console.log(`Success! parameterized  message #3`);
                        console.log(successMsg);
                    })
                    .catch((failureMsg) => {
                        console.log(`Error! parameterized  message #3`);
                        console.log(failureMsg);
                    });
            })
            .catch((failureMsg) => {
                console.log(`Error! parameterized  message #2`);
                console.log(failureMsg);
            });
    })
    .catch((failureMsg) => {
        console.log(`Error! parameterized  message #1`);
        console.log(failureMsg);
    });
*/

//make another request only if the first request is successful - CHAINED
fakeRequestPromise('books.com/page1')
    .then((successMsg) => {
        console.log(`Success! parameterized  message #1`);
        console.log(successMsg);
        return fakeRequestPromise('books.com/page2');
    })
    .then((successMsg) => {
        console.log(`Success! parameterized  message #2`);
        console.log(successMsg);
        return fakeRequestPromise('books.com/page3');
    })
    .then((successMsg) => {
        console.log(`Success! parameterized  message #3`);
        console.log(successMsg);
    })
    .catch((failureMsg) => {
        console.log(`Error! parameterized  message <GENERIC>`);
        console.log(failureMsg);
    });    