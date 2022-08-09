const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

/*
app.use((req, res) => {
    res.send('HIJACKED BY APP.USE!!');
});



app.use((req, res, next) => {
    const { password } = req.query;
    if (password === 'secret') {
        next();
    }
    res.send('NOT AUTHENTICATED!');
});
*/

app.get('/error', (req, res) => {
    throw new Error("My Error");
})

app.get('/error2', (req, res) => {
    chicken.fly();
});

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin', 403);
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'secret') {
        next();
    }
    throw new AppError('PASSWORD REQUIRED/INCORRECT', 401);
    //res.status(401);
    //throw new Error("NOT AUTHENTICATED!");
    //res.send('NOT AUTHENTICATED!');
}

app.use((req, res, next) => {
    console.log('THIS IS MY FIRST MIDDLEWARE!!');
    next();
    console.log(`TIME NOW IS -> ${req.requestTime}`);
    console.log('THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT !!');
});

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log('THIS IS MY SECOND MIDDLEWARE!!');
    next();
});

app.use('/dogs', (req, res, next) => {
    console.log('THIS IS MY DOG EXCLUSIVE MIDDLEWARE!!');
    next();
});

app.use('/secureroute', verifyPassword, (req, res, next) => {
    console.log('THIS IS MY SECURE ROUTE!!');
    res.send('SECURE PAGE');
});

//app.use(morgan('tiny')); //On every single request, use morgan middleware function
//app.use(morgan('dev')); //For developer users. Colorizes response code
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF!');
});

//THIS WILL ONLY RUN IF NO OTHER ROUTES MATCH. PLACED AT THE END OF THE APP
//app.use((req, res) => {
//    res.status(404).send('NOT FOUND!');
//});

/*
//THIS ERROR HANDLING MIDDLEWARE WILL RUN IF ANY ERROR IS THROWN
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    //next(err); -> This will return the error stack trace to the browser
});
*/

app.use(function (err, req, res, next) {
    const { status = 500, message = 'Generic Error - Something broke!' } = err;
    console.error(err.stack);
    res.status(status).send(message);
    //next(err); -> This will return the error stack trace to the browser
});

app.listen(3000, () => {
    console.log('App is running on localhost 3000');
})