//Define a class with class keyword
class MyColor {

    //This function will run automatically whenever you instantiate a new instance of the class
    //keyword 'this' will refer to individual object
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        console.log(this);
    }

    //These methods are added to the prototype automatically unlike MyColor.prototype.greet
    greet() {
        console.log(`Hello from color! ${this.name}`);
    }

    innerRGB() {
        const { r, g, b } = this;
        return `${r},${g},${b}`;
    }

    getRGBValue() {
        return `rgb(${this.innerRGB()})`;
    }

    getRGBAValue(a = 1.0) {
        return `rgba(${this.innerRGB()},${a})`;
    }

    getHexValue() {
        const { r, g, b } = this;
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }



    /*
    * HSL (for hue, saturation, lightness)
    * H - Hue - 0 to 360 degrees around the color wheel
    * S - Saturation - Percentage
    * L - Lightness - Percentage
    */
    getHSLValue() {
        let { r, g, b } = this;
        // convert r,g,b [0,255] range to [0,1]
        r = r / 255,
            g = g / 255,
            b = b / 255;
        // get the min and max of r,g,b
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        // lightness is the average of the largest and smallest color components
        var lum = (max + min) / 2;
        var hue;
        var sat;
        if (max == min) { // no saturation
            hue = 0;
            sat = 0;
        } else {
            var c = max - min; // chroma
            // saturation is simply the chroma scaled to fill
            // the interval [0, 1] for every combination of hue and lightness
            sat = c / (1 - Math.abs(2 * lum - 1));
            switch (max) {
                case r:
                    // hue = (g - b) / c;
                    // hue = ((g - b) / c) % 6;
                    // hue = (g - b) / c + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / c + 2;
                    break;
                case b:
                    hue = (r - g) / c + 4;
                    break;
            }
        }
        hue = Math.round(hue * 60); // °
        sat = Math.round(sat * 100); // %
        lum = Math.round(lum * 100); // %
        return `hsl(${hue},${sat}%,${lum}%)`;

    }
}

const c1 = new MyColor(10, 20, 30, 'tomato');
c1.greet(); //Hello from color! tomato
console.log(c1.getRGBValue());
console.log(c1.getRGBAValue(0.8));
console.log(c1.getHSLValue());

//"hsl(130, 100%, 40%)"
//"rgb(150, 100, 10)"
//const mycolor = ['#00BCD4','#EC407A','#9c27B0']
//hsl(353,100%,63%)