const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!');
    })
    .catch(() => {
        console.log('OOPS..MONGO CONNECTION ERROR!');
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    addresses: [
        {
            _id: { id: false },
            street: String,
            area: String,
            city: String,
            country: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const newUser = new User({
        first: 'vijay',
        last: 'anand'
    });
    newUser.addresses.push({
        street: 'Nookampalayam Main Road',
        area: 'Perumbakkam',
        city: 'Chennai',
        country: 'India'
    })
    const result = await newUser.save();
    console.log(result);
}

const addAddress = async (id) => {
    const existingUser = await User.findById(id);
    existingUser.addresses.push({
        street: 'Mambakkam Main Road',
        area: 'Medavakkam',
        city: 'Chennai',
        country: 'India'
    })
    const result = await existingUser.save();
    console.log(result);
}

//makeUser();
addAddress('62ce2fdf9207d1ddc78f1382');    