const express = require('express');
const data = require('./data.json');
const app = express();
const port = 3001
app.set('view engine', 'ejs');

app.get('/section/:subsection', (req, res) => {
    const { subsection } = req.params;
    const subsectionData = data[subsection]
    if (subsectionData) {
        res.render('home', { ...subsectionData });//triple dots mean spread
    } else {
        res.render('notfound', { subsection });
    }
})


app.listen(port, () => {
    console.log("Listening on port 3001");
})