/*
fetch('https://api.cryptonator.com/api/ticker/btc-usd').
    then((res) => {
        console.log('RESPONSE.. WAITING TO PARSE');
        return res.json();
    }).
    then((data) => {
        console.log(`DATA PARSED`);
        console.log(data);
    }).
    catch(() => {
        console.log("ERROR!", e)
    })
*/
//USING ASYNC AND PROMISES
const fetchBitcoinPrice = async () => {
    try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log("ERROR!", e)
    }

}
fetchBitcoinPrice();
