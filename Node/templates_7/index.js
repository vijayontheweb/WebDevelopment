const express = require('express');
const app = express();
const port = 3000
//By default the templates will be available in views folder. Also.ejs extension not needed
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //res.render('views/home.ejs');
    res.render('home');
})

app.get('/random', (req, res) => {
    //res.render('views/random.ejs');
    const randFromNode = Math.floor(Math.random() * 10) + 1;
    //res.render('random', { randFromNode: randFromNode });
    //If both key and value are same, we can combine into one 
    res.render('random', { randFromNode });
})

app.get('/section/:subsection/x/y/z/:nestedsection', (req, res) => {
    const params = req.params;
    const { subsection, nestedsection } = req.params;
    const randFromNode = Math.floor(Math.random() * 10) + 1;
    const family = ['vijay', 'priya', 'gautham', 'meenu', 'nimi', 'selva'];
    res.render('random', { subsection, nestedsection, randFromNode, family });
})

app.listen(port, () => {
    console.log("Listening on port 3000");
})