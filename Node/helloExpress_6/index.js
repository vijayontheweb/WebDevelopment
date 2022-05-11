const express = require('express');
const app = express();
console.dir(app);
const port = 3000

//app.use((req, res) => {
//res.send('SENDING RESPONSE AS STRING');
//res.send('<h1>SENDING RESPONSE AS HTML<h1>');
//res.send({ some: 'SENDING RESPONSE AS JAVASCRIPT OBJECT' });
//})

app.get('/', (req, res) => {
    res.send('WELCOME HOME!!!')
})

//subsection could be anything
//for example, http://localhost:3000/section/whatever
app.get('/section/:subsection', (req, res) => {
    const params = req.params;
    console.log(params);
    const { subsection } = req.params;
    res.send(`WELCOME TO ${subsection} SUBSECTION!`)
})

app.get('/section/:subsection/x/y/z/:nestedsection', (req, res) => {
    const params = req.params;
    console.log(params);
    const { subsection, nestedsection } = req.params;
    res.send(`WELCOME TO ${nestedsection} OF ${subsection} SUBSECTION!`)
})

app.get('/dogs', (req, res) => {
    res.send('DOGS SAY WOOF!')
})

app.get('/cats', (req, res) => {
    res.send('CATS SAY MEOW!')
})

//for example, http://localhost:3000/search?name=vijay&color=blue
app.get('/search', (req, res) => {
    console.dir(req.query);
    const { name, color } = req.query;
    res.send(`THE NAME IS ${name} AND COLOR IS ${color}`)
})


app.get('*', (req, res) => {
    res.send('I DONT KNOW THAT PATH')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})