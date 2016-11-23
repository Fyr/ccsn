class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return `(${this.x}, ${this.y})`;
	}
}

class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
	}
	toString() {
		return super.toString() + ' in ' + this.color;
	}
}

const cp = new ColorPoint(25, 8, 'green');

console.log(cp.toString());
console.log(cp instanceof ColorPoint);
console.log(cp instanceof Point);

let arr = ["hello", 2]; // let

let [str, times] = arr; // деструктуризация

console.log(str.repeat(times)); // hellohello, метод repeat
