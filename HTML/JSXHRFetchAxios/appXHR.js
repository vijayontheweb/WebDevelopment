const myReq = new XMLHttpRequest();

myReq.onload = function () {
    console.log('All done with request!');
    console.log(this);
    const data = JSON.parse(this.responseText)
    console.log(data);
    console.log(`PRICE IS ${data.ticker.price}`)
};

myReq.onerror = function (err) {
    console.log('ERROR!', err);
    console.log(this);
};

myReq.open('get', 'https://api.cryptonator.com/api/ticker/btc-usd', true);
myReq.setRequestHeader('Accept', 'application/json');
myReq.send();