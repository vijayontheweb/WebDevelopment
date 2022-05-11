const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const Product = require('./models/product');

const port = 3000
const app = new express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())//for parsing application/json
app.use(express.urlencoded({ extended: true }))
//Even though it is a POST request from the form, express is going to treat it as a PATCH request
//Override with POST having ?_method=PATCH
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(() => {
        console.log('OOPS..MONGO CONNECTION ERROR!');
        console.log(err);
    });

//DONE    
//Index - GET /products - List all products
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', { products });
});

//DONE 
//New - GET /products/new - FORM to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new');
});

//DONE 
//Create - POST /products - Create a new product
app.post('/products', async (req, res) => {
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
});

//DONE
//Show - GET /products/:id - Get one product(using id)
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`products/show`, { product });
});

//DONE
//Edit - GET /products/:id/edit - FORM to edit specific product(using id)
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`products/edit`, { product });
});

//DONE
//Update - PATCH /products/:id - Update one product(using id)
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    await Product.findByIdAndUpdate(id, req.body);
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
});

//Destroy - DELETE / products /: id - Delete one product(using id)
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    const products = await Product.find({});
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(products);
    res.render('products/index', { products });
});

app.listen(port, () => {
    console.log('Listening on port 3000');
});
