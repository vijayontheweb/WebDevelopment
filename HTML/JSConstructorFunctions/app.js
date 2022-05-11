function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    console.log(this);
}
/* Adding functions using prototype. Unlike factory function, this method is common to
all objects  */
Color.prototype.getRGBValue = function () {
    console.log(this);
    const { r, g, b } = this;
    return `rgb(${r},${g},${b})`;
}

Color.prototype.getRGBAValue = function (a = 1.0) {
    console.log(this);
    const { r, g, b } = this;
    return `rgba(${r},${g},${b},${a})`;
}

Color.prototype.getHexValue = function () {
    console.log(this);
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* Unless using 'new' operator, this is going to refer to the global scope, 
the nearest object is the window object */
Color(1, 1, 1)
/* With the 'new' operator, this is going to refer to the actual object itself
instead of the window object*/
new Color(1, 1, 1);

const color1 = new Color(100, 100, 100);
const color2 = new Color(200, 200, 200);
//returns true as they are on the shared prototype object
console.log(color1.getRGBValue === color2.getRGBValue);

color1.getHexValue();    //'#646464'
color2.getHexValue();    //'#c8c8c8'

document.body.style.backgroundColor = color2.getRGBAValue();
