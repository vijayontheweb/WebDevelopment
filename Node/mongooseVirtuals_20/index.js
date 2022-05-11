const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personsApp');
//define a schema
var personSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }
});

personSchema.virtual('fullName').get(function () {
    return `${this.name.first} ${this.name.last}`;
}).set(function (value) {
    this.name.first = value.substr(0, value.indexOf(' '));
    this.name.last = value.substr(value.indexOf(' ') + 1, value.length);
});

personSchema.pre('save', function () {
    this.fullName = 'Jim Carrey'
    console.log('BEFORE SAVE!')
});
personSchema.post('save', function () {
    console.log('AFTER SAVE!')
});

//compile our model
const Person = mongoose.model('Person', personSchema);

//create a document
const person1 = new Person({
    name: {
        first: "Vijay",
        last: "Anand"
    }
});

console.log(person1.name.first + " " + person1.name.last);
console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
//Alternatively a virtual property getter lets you define a fullname property
//that won't persisted to MongoDB
console.log(person1.fullName);
//Saving into Mongo
person1.save().then(console.log(person1));

const person2 = new Person({
    name: {
        first: 'Priyanka',
        last: 'KV'
    }
});
console.log(person2.fullName);
person2.fullName = 'Priyanka Vijay'
person2.save().then(console.log(person1));
//If you use JSON.stringify i.e toJSON(), mongoose wil not include virtuals by default
console.log(JSON.stringify(person2));
//Pass {virtuals:true} to include virtuals
console.log(person2.toJSON({ virtuals: true }));
