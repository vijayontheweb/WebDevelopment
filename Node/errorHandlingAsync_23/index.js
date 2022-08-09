const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const Product = require('./models/product');
const AppError = require('./AppError');
const { nextTick } = require('process');

const port = 3000
const app = new express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())//for parsing application/json
app.use(express.urlencoded({ extended: true }))
//Even though it is a POST request from the form, express is going to treat it as a PATCH request
//Override with POST having ?_method=PATCH
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/farmStand2', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(() => {
        console.log('OOPS..MONGO CONNECTION ERROR!');
        console.log(err);
    });

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((e) => { next(e) });
    }
};


//DONE    
//Index - GET /products - List all products
app.get('/products', wrapAsync(async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', { products });
}));

//DONE 
//New - GET /products/new - FORM to create a new product
app.get('/products/new', (req, res) => {
    //throw new AppError('product not found', '401');
    res.render('products/new');
});

//DONE 
//Create - POST /products - Create a new product
app.post('/products', wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
}));

//DONE
//Show - GET /products/:id - Get one product(using id)
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError('product not found', '401');
    }
    res.render(`products/show`, { product });
}));

//DONE
//Edit - GET /products/:id/edit - FORM to edit specific product(using id)
app.get('/products/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('product not found', '401'));
    }
    res.render(`products/edit`, { product });
}));

//DONE
//Update - PATCH /products/:id - Update one product(using id)
app.put('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    await Product.findByIdAndUpdate(id, req.body);
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
}));

//Destroy - DELETE / products /: id - Delete one product(using id)
app.delete('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
}));

const handleValidationError = err => {
    console.dir(err);
    return new AppError(`VALIDATION FAILED CUSTOM MESSAGE .. ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === "ValidationError") {
        err = handleValidationError(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
    const { status = '500', message = 'Something went wrong!' } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log('Listening on port 3000');
});
