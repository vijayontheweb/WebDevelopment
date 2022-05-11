/*
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/animalShelter');
const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/animalShelter')
    .then(() => { console.log('CONNECTED!') })
    .catch(() => { console.log('OOPS..ERROR!') });

