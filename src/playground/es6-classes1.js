  
class Person {
    constructor(name = 'Unknown', age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        return `Hi ${this.name}`;
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old`
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age); 
        this.major = major;
    }

    hasMajor() {
        return !!this.major;
    }

    getDescription() {
        let description = super.getDescription();
        return 'testing: ' + description;
    }
}

class Traveler extends Person {
    constructor(name, age, location) {
        super(name, age);
        this.location = location;
    }

    getGreeting() {
        let greeting = `Hi. I am ${this.name}`;

        if(this.location) {
            greeting += `. I'm visiting from ${this.location}`;
        }

        return greeting;
    }
}

const person = new Traveler('Robin Arida', 28, 'Caloocan City');
console.log(person.getGreeting());

const person2 = new Traveler();
console.log(person2.getGreeting());