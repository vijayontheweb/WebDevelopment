class Animal {
    constructor(name) {
        this.name = name
    }

    eat() {
        console.log(`${this.name} is eating!`)
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name)
    }

    makeSound() {
        console.log(`MEOWW!`)
    }
}

class Dog extends Animal {

    constructor(name, isHunter) {
        super(name);
        this.isHunter = isHunter;
    }

    makeSound() {
        console.log(`WOOF!`);
    }

}

const cat1 = new Cat('Amy')
console.dir(cat1)
cat1.eat()
cat1.makeSound()
const dog1 = new Dog('Tommy', true)
console.dir(dog1)
dog1.eat()
dog1.makeSound()