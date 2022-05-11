//SIMPLE CONDITION
let age = prompt('Enter your age');
if (age < 5) {
    alert('You are a toddler!')
} else if (age < 18) {
    alert('You are a child!')
} else if (age < 60) {
    alert('You are an adult!')
} else {
    alert('You are a senior citizen!')
}
//WITH MATH
let randomValue = Math.random();
console.log(randomValue);
let roundValue = Math.round(randomValue);
console.log(roundValue);
if (roundValue == 1) {
    console.log('You got a tail!')
} else {
    console.log('You got a head!')
}
//TRUTH/FALSE
let value = prompt('Truth/False Test. Enter Something:');
if (value) {
    console.log('TRUTHY!')
} else {
    console.log('FALSEY!')
}

if (0) { console.log('TRUTHY'); } else { console.log('FALSEY'); }