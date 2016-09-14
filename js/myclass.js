var Animal = createClass({
	abstracts: ['say'],
	construct: function(name) {
		this.name = name;
	},
	eat: function() {
		return 'ou yeah...';
	}
});

var Kitty = createClass({
	extend: Animal,
	say: function() {
		return this.name + ' said: RrrrRRR...Mau..';
	},
	eat: function() {
		return Animal.fn.eat.call(this) + 'FISH!!'
	}
});