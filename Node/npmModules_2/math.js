const add = (x, y) => x + y;
const PI = 3.14159;
const square = x => x * x;

//SOLUTION #1
//The contents of module.exports is usually an object
//module.exports = "HELLO!"

//SOLUTION #2
//module.exports.add = add
//module.exports.PI = PI
//module.exports.square = square

//SOLUTION #3
//const math = {
//    PI: PI,
//    add: add,
//    square: square
//};
//module.exports = math

//SOLUTION #4
//module.exports.add = (x, y) => x + y;
//module.exports.PI = 3.14159;
//module.exports.square = x => x * x;

//SOLUTION #5
exports.add = (x, y) => x + y;
exports.PI = 3.14159;
exports.square = x => x * x;