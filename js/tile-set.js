var TileSet = createClass({
	construct: function (data, activeTile) {
		this.data = [];
		this.activeTile = '';

		if (data) {
			this.setData(data);
		}
		if (activeTile) {
			this.setActiveTile(activeTile);
		}
	},

	setData: function (data) {
		this.tiles = data;
	},

	getData: function () {
		return this.tiles;
	},

	setActiveTile: function (activeTile) {
		this.activeTile = activeTile;
	},

	getActiveTile: function () {
		return this.activeTile;
	},

	getImgSrc: function (tile) {
		if (!tile) {
			tile = this.getActiveTile();
		}
		// tile - может быть тайл или слот
		return '/img/tiles/tile-' + tile + '.png';
	},

	getRows: function () {
		return this.getData().length;
	},

	getCols: function () {
		return this.getData()[0].length;
	},

	getTile: function (i, j) {
		return this.getData()[i][j];
		var e = this.getData()[i][j].split('|');
		// return {src: this.getImgSrc(e[0]), class: 'rotate' + }
	}
});
/*
var TileSet = function(){
	var self = this;

	self.data = [['', 'slot', ''], ['slot', 't1-r24', 'slot'], ['', 'slot', '']];
	self.isLasso = false;

	this.setData = function(data) {
		self.data = data;
	};
	
	this.getData = function() {
		return self.data;
	};

	this.extendData = function() {
		var mapTiles = self.getData();
		var row = mapTiles.length - 1;
		var emptyRow = [];
		for(var col = 0; col < mapTiles[row].length; col++) {
			emptyRow.push('');
		}
		if (self._checkRowExtandable(row)) { // check bottom row
			mapTiles.push(emptyRow);
		} else if (self._checkRowExtandable(0)) { // check top row
			mapTiles.unshift(emptyRow);
		} else if (self._checkColExtandable(0)) { // check left col
			for(var row = 0; row < mapTiles.length; row++) {
				mapTiles[row].unshift('');
			}
		} else if (self._checkColExtandable(mapTiles[0].length - 1)) { // check right col
			for(var row = 0; row < mapTiles.length; row++) {
				mapTiles[row].push('');
			}
		}
	};

	this._checkRowExtandable = function(row) {
		var mapTiles = self.getData();
		for(var col = 0; col < mapTiles[row].length; col++) {
			if (mapTiles[row][col]) {
				return true;
			}
		}
		return false;
	};

	this._checkColExtandable = function(col) {
		var mapTiles = self.getData();
		for(var row = 0; row < mapTiles.length; row++) {
			if (mapTiles[row][col]) {
				return true;
			}
		}
		return false;
	};

	this.clearSlots = function() {
		var mapTiles = this.getData();
		for(var i = 0; i < mapTiles.length; i++) {
			for(var j = 0; j < mapTiles[i].length; j++) {
				var tile = mapTiles[i][j];
				if (tile == 'slot') {
					mapTiles[i][j] = '';
				}
			}
		}
		this.setData(mapTiles);
	};

	this.setCurrTile = function(tile) {
		var tileData = TILES[tile];
	};

	this.revealSlots = function(){
		var mapTiles = this.getData();
		for(var i = 1; i < (mapTiles.length - 1); i++) {
			for(var j = 1; j < (mapTiles[i].length - 1); j++) {
				tile = mapTiles[i][j];
				if (tile && tile != 'slot') {
					if (!mapTiles[i - 1][j]) {
						mapTiles[i - 1][j] = 'slot';
					}
					if (!mapTiles[i][j + 1]) {
						mapTiles[i][j + 1] = 'slot';
					}
					if (!mapTiles[i + 1][j]) {
						mapTiles[i + 1][j] = 'slot';
					}
					if (!mapTiles[i][j - 1]) {
						mapTiles[i][j - 1] = 'slot';
					}
				}

			}
		}
		this.setData(mapTiles);
	};

	this.getTileData = function(tileName) {
		return TILES[tile];
	};

	this.revealAvailableSlots = function(tileName) {

	};
}
	*/