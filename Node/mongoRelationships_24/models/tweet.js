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
    name: String,
    age: Number
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    //const user = new User({ name: 'Vijay', age: 40 });
    const user = await User.findOne({ name: 'Vijay', age: 40 });
    const tweet1 = new Tweet({ text: 'Work is also essential!', likes: 12341 });
    tweet1.user = user;
    //user.save();
    tweet1.save();
}

const findTweets = async () => {
    const tweet = await Tweet.findOne({ text: 'Sleep is essential!' }).populate('user');
    console.log(tweet);
}

findTweets();
//makeTweets();