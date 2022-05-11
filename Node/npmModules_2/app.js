const math = require('./math');
//we can also destructure modules as follows
const { PI, add, square } = require('./math');
const mydir = require('./mydir');

console.log(math);

console.log(math.PI);
console.log(math.add(3, 2));
console.log(math.square(9));

//using destructured modules
console.log(PI);
console.log(add(3, 2));
console.log(square(9));

//requires directory
console.log(mydir);