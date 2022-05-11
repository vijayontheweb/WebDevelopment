const express = require('express');
const path = require('path');
const data = require('./data.json');
const app = express();
const port = 3000
app.set('view engine', 'ejs');

//To serve static files such as images, CSS, Javascript, font, images and logo
app.use(express.static(path.join(__dirname, 'public')));
//directory for EJS templates. Everything inside public directory will be accessible in EJS templates
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/section/:subsection', (req, res) => {
    const { subsection } = req.params;
    const subsectionData = data[subsection]
    if (subsectionData) {
        res.render('subsection', { ...subsectionData });//triple dots mean spread
    } else {
        res.render('notfound', { subsection });
    }
})

app.get('/random', (req, res) => {
    const randFromNode = Math.floor(Math.random() * 10) + 1;
    res.render('random', { randFromNode });
})


app.listen(port, () => {
    console.log("Listening on port 3000");
})