const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure(`Connection Timeout`);
        } else {
            success(`Here is your fake data from ${url}`);
        }
    }, delay);
};

fakeRequestCallback('books.com/page1', (successMsg) => {
    console.log(`Success! parameterized  message #1`);
    console.log(successMsg);
    fakeRequestCallback('books.com/page2', (successMsg) => {
        console.log(`Success! parameterized  message #2`);
        console.log(successMsg);
        fakeRequestCallback('books.com/page3', (successMsg) => {
            console.log(`Success! parameterized  message #3`);
            console.log(successMsg);
        }, (failureMsg) => {
            console.log(`Error! parameterized  message #3`);
            console.log(failureMsg);
        });
    }, (failureMsg) => {
        console.log(`Error! parameterized  message #2`);
        console.log(failureMsg);
    });
}, (failureMsg) => {
    console.log(`Error! parameterized  message #1`);
    console.log(failureMsg);
});