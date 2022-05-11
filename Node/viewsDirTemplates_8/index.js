const express = require('express');
const path = require('path');
const app = express();
const port = 3000
//By default the templates will be available in views folder. Also.ejs extension not needed
app.set('view engine', 'ejs');
//If we want the index.js to be run from anywhere, we need to change the "views" directory 
//i.e the directory where index.js is located, slash views. It can be custom name too i.e templateViews
app.set('views', path.join(__dirname, 'templateViews'));

app.get('/', (req, res) => {
    //res.render('views/home.ejs');
    res.render('home');
})

app.listen(port, () => {
    console.log("Listening on port 3000");
})