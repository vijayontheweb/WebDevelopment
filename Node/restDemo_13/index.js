const express = require('express');
const path = require('path');
const { v4: myUUID } = require('uuid');
var methodOverride = require('method-override');
const app = new express();
app.set('view engine', 'ejs');
const port = 3000


app.use(express.json())//for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
//Even though it is a POST request from the form, express is going to treat it as a PATCH request
//Override with POST having ?_method=PATCH
app.use(methodOverride('_method'));

let comments = [
    {
        id: myUUID(),
        user: 'Vijay',
        text: 'Hello, Howdy?'
    },
    {
        id: myUUID(),
        user: 'Priya',
        text: 'Hi, Im fine'
    }

];

//Index - GET /comments - List all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

//New - GET /comments/new - FORM to create a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

//Create - POST /comments - Create a new comment
app.post('/comments', (req, res) => {
    const { user, text } = req.body;
    console.log(req.body);
    comments.push({ user, text, id: myUUID() });
    res.redirect('/comments');//by default, it is GET request
});

//Show - GET /comments/:id - Get one comment(using id)
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render(`comments/show`, { comment });
});

//Edit - GET /comments/:id/edit - FORM to edit specific comment(using id)
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render(`comments/edit`, { comment });
});

//Update - PATCH /comments/:id - Update one comment(using id)
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.text;
    const currentComment = comments.find(c => c.id === id);
    currentComment.text = newCommentText
    res.render(`comments`, { comments });
});

//Destroy - DELETE / comments /: id - Delete one comment(using id)
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const filteredComments = comments.filter(c => c.id !== id);
    comments = filteredComments;
    res.render(`comments`, { comments });
});

app.get('/tacos', (req, res) => {
    res.send('GET request invoked')
});

app.post('/tacos', (req, res) => {
    //This will print as undefined unless you define app.use(express.json()) 
    console.log(req.body)
    res.send('POST request invoked')
});

app.listen(port, () => {
    console.log('Listening on port 3000');
});