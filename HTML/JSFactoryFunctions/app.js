/*
function getHexValue(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getRGBValue(r, g, b) {
    return `rgb(${r},${g},${b})`;
}

console.log(getHexValue(3, 100, 254));
console.log(getRGBValue(3, 100, 254));
*/

const makeColor = (r, g, b) => {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.getHexValue = function () {
        console.log(this);
        const { r, g, b } = this;
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    color.getRGBValue = function () {
        console.log(this);
        const { r, g, b } = this;
        return `rgb(${r},${g},${b})`;
    }
    return color;
}