/*
axios.get('https://api.cryptonator.com/api/ticker/btc-usd').
    then((res) => {
        console.log('RESPONSE.. NO WAIT... DATA ALREADY PARSED');
        console.log(res.data);
    }).
    catch(() => {
        console.log("ERROR!", e)
    })
    */
//USING ASYNC AND PROMISES

const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
        console.log(res.data);
    } catch (e) {
        console.log("ERROR!", e)
    }

}

fetchBitcoinPrice();
