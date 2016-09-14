var Tile = createClass({
	construct: function(x, y, state) {
		this.x = null;
		this.y = null;
		this.setXY(x, y);

		this.state = null;
		if (isset(state)) {
			this.setState(state);
		}

		this.items = {};
		this.props = {};
	},
	setXY: function(x, y) {
		if (isset(x)) {
			this.x = x;
		}
		if (isset(y)) {
			this.y = y;
		}
	},
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	setState: function(state) {
		this.state = state;
	},
	getState: function() {
		return this.state;
	},
	prop: function(key, val) {
		if (isset(val)) {
			this.props[key] = val;
		} else {
			return JSON.get(this.props, key);
		}
	}, /*
	addItem: function(key, val) {
		this.items[key] = val;
	},
	getItem: function(key) {
		return JSON.get(this.items, key);
	},
	delItem: function(key) {
		this.items[key] = null;
	}, */
	draw: function() {
		console.log('Tile.draw ', this.x, this.y, this.state, this.items);
	}
});

var AreaTile = createClass({
	extend: Tile,
	statics: {
		STATE_FREE: 0,
		STATE_BLOCKED: 1,
		SIZE: 30,
		BORDER: 2,
		COLOR: { BKG: {FREE: '#eee', BLOCKED: '#777'}, BORDER: '#ddd'}
	},
	construct: function(x, y, state, canvas) {
		Tile.call(this, x, y, state);
		this.canvas = canvas;

		var bkg = AreaTile.COLOR.BKG;
		this.canvasObjs = {
			body: new fabric.Rect({
				left: this.getX(),
				top: this.getY(),
				fill: (this.getState() == AreaTile.STATE_BLOCKED) ? bkg.BLOCKED : bkg.FREE,
				width: AreaTile.SIZE,
				height: AreaTile.SIZE,
				strokeWidth: AreaTile.BORDER, stroke: AreaTile.COLOR.BORDER,
				hasControls: false,
				hasBorders: false,
				lockMovementX: true,
				lockMovementY: true,
				lockRotation: true
			}),
			text: new fabric.Text('', {
				left: this.getX() + 2,
				top: this.getY() + 2,
				fontFamily: 'Helvetica',
				fontSize: 10,
				fill: '#00f',
				hasControls: false,
				hasBorders: false,
				lockMovementX: true,
				lockMovementY: true,
				lockRotation: true
			})
		};
		var self = this;
		this.canvasObjs.body.on('selected', function(){
			console.log('Tile.mousedown', self.prop('note'));
			/*
			if (!self.prop('startPoint')) {
				var text = new fabric.Text('A', {
					left: this.getX() + 5,
					top: this.getY() + 5,
					fontFamily: 'Helvetica',
					fontSize: 15,
					fill: '#f00'
				});
				self.canvasObjs.push(text);
				self.draw(true);
			}
			*/
		});
	},
	draw: function(lRedraw) {
		this.canvasObjs.text.setText(this.prop('note'));
		var canvas = this.canvas;
		JSON.iterate(this.canvasObjs, function(e) {
			if (isset(e)) {
				if (isset(lRedraw) && lRedraw) {
					canvas.remove(e);
				}
				canvas.add(e);
			}
		});


		// this.canvas.add(this.canvasObjs.text);
		// console.log('AreaTile.draw ', this.x, this.y, this.state == AreaTile.STATE_BLOCKED ? 'Blocked' : 'Free');
	}
});