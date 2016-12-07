var TileSet = createClass({
	construct: function (tiles, activeTile, tileData) {
		this.tiles = [];
		this.activeTile = '';
		this.tileData = tileData;
		if (tiles) {
			this.setTiles(tiles);
		}
		if (activeTile) {
			this.setActiveTile(activeTile);
		}
	},

	setTiles: function (data) {
		this.tiles = data;
	},

	getTiles: function () {
		return this.tiles;
	},

	setActiveTile: function (activeTile) {
		this.activeTile = activeTile;
	},

	getActiveTile: function () {
		return this.activeTile;
	},

	getRows: function () {
		return this.getTiles().length;
	},

	getCols: function () {
		return this.getTiles()[0].length;
	},

	setTile: function (i, j, tile) {
		var tiles =  this.getTiles();
		console.log('TileSet.setTile()', i, j, tile, tiles);
		tiles[i][j] = tile;
		this.setTiles(tiles);
	},

	getTile: function (i, j) {
		return this.getTiles()[i][j];
	},

	rotate: function (i, j) {
		var tile = this.getActiveTile().split('|');
		var dir = (tile.length > 1) ? tile[1] : 0;
		tile = tile[0];

		dir++;
		if (dir > 3) {
			dir = 0;
		}
		if (dir > 0) {
			tile = tile + '|' + dir;
		}
		this.setActiveTile(tile);
	},

	extendData: function() {
		var mapTiles = this.getTiles();
		var emptyRow = [], emptyRow2 = [], row;
		for(var col = 0; col < mapTiles[0].length; col++) {
			emptyRow.push('');
			emptyRow2.push('');
		}
		if (this._checkRowExtandable(0)) { // check top row
			mapTiles.unshift(emptyRow);
		}

		if (this._checkRowExtandable(mapTiles.length - 1)) { // check bottom row
			mapTiles.push(emptyRow2); // bug with pushing array by reference
		}
		if (this._checkColExtandable(0)) { // check left col
			for(row = 0; row < mapTiles.length; row++) {
				mapTiles[row].unshift('');
			}
		}
		if (this._checkColExtandable(mapTiles[0].length - 1)) { // check right col
			for(row = 0; row < mapTiles.length; row++) {
				mapTiles[row].push('');
			}
		}
		this.setTiles(mapTiles);
	},

	_checkRowExtandable: function(row) {
		var mapTiles = this.getTiles(), col;
		for(col = 0; col < mapTiles[row].length; col++) {
			if (mapTiles[row][col]) {
				return true;
			}
		}
		return false;
	},

	_checkColExtandable: function(col) {
		var mapTiles = this.getTiles(), row;
		for(row = 0; row < mapTiles.length; row++) {
			if (mapTiles[row][col]) {
				return true;
			}
		}
		return false;
	},

	revealSlots: function () {
		for(var i = 1; i < this.getRows(); i++) {
			for(var j = 1; j < this.getCols(); j++) {
				tile = this.getTile(i, j);
				if (tile && tile != 'slot') {
					if (!this.getTile(i - 1, j)) {
						this.setTile(i - 1, j, 'slot');
					}
					if (!this.getTile(i, j + 1)) {
						this.setTile(i, j + 1, 'slot');
					}
					if (!this.getTile(i + 1, j)) {
						this.setTile(i + 1, j, 'slot');
					}
					if (!this.getTile(i, j - 1)) {
						this.setTile(i, j - 1, 'slot');
					}
				}
			}
		}
		// this.setTiles(mapTiles);
	},

	checkSlot: function (i, j) {
		// tile [i,j]  должен быть slot!!!
		var tile, tileOK = true;
		if (tileOK && ((i - 1)>= 0) && (tile = this.getTile(i - 1, j)) && tile !== 'slot') { // проверяем возможный стык сверху
			// console.log('top', this.getActiveTile(), i - 1, j, tile);
			tileOK = this.tileData.getTileSide(this.getActiveTile(), 0) === this.tileData.getTileSide(tile, 2);
		}
		if (tileOK && ((i + 1) < this.getRows()) && (tile = this.getTile(i + 1, j)) && tile !== 'slot') { // проверяем возможный стык снизу
			// console.log('bottom', this.getActiveTile(), i + 1, j, tile);
			tileOK = this.tileData.getTileSide(this.getActiveTile(), 2) === this.tileData.getTileSide(tile, 0);
		}
		if (tileOK && ((j - 1) >= 0) && (tile = this.getTile(i, j - 1)) && tile !== 'slot') { // проверяем возможный стык слева
			// console.log('left', this.getActiveTile(), i, j - 1, tile);
			tileOK = this.tileData.getTileSide(this.getActiveTile(), 3) === this.tileData.getTileSide(tile, 1);
		}
		if (tileOK && ((j + 1) < this.getCols()) && (tile = this.getTile(i, j + 1)) && tile !== 'slot') { // проверяем возможный стык справа
			// console.log('right', this.getActiveTile(), i, j + 1, tile);
			tileOK = this.tileData.getTileSide(this.getActiveTile(), 1) === this.tileData.getTileSide(tile, 3);
		}
		return tileOK;
	},

	calcActiveSlots: function() {
		// делаем проверку доступных слотов в 2 этапа
		// 1. сначала выявляем потенциально доступные слоты,
		// т.к. при их проверке они могут друг на друга накладываться
		// 2. проверяем только потенциальные слоты - сокращаем время проверки
		this.revealSlots();
		for(var i = 0; i < this.getRows(); i++) {
			for (var j = 0; j < this.getCols(); j++) {
				if (this.getTile(i, j) === 'slot') {
					// console.log('check slot', i, j);
					this.setTile(i, j, this.checkSlot(i, j) ? 'slot' : '');
				}
			}
		}
	}
});
