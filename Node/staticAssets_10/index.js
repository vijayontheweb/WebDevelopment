const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
const port = 3000

//To serve static files such as images, CSS, Javascript, font, images and logo
app.use(express.static(path.join(__dirname, 'public')));
//directory for EJS templates. Everything inside public directory will be accessible in EJS templates
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})