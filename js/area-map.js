/*
AreaMap - размеры и положение рабочей области, В НЕЕ ВХОДИТ NAV
Для #map размеры должны быть уменьшены на AreaMap.NAV
В идеале LEFT = TOP = 0 (верхний левый угол окна), W, H = размеры окна
*/
var AreaMap = createClass({
	static: {
		W: 600, H: 400, TOP: 50, LEFT: 50, NAV: 25, SCROLL: 2, DELAY: 10, TILE: 44, MAGNET: 10, MIPLE: 12
	}
});
/*
var AreaMap = createClass({
	construct: function(cols, rows, canvas) {
		this.rows = rows;
		this.cols = cols;
		this.tiles = [];

		this.canvas = canvas;
		this.canvas
			.setHeight(AreaTile.SIZE * this.rows + AreaTile.BORDER)
			.setWidth(AreaTile.SIZE * this.cols + AreaTile.BORDER);
		this.initTiles();
	},
	initTiles: function() {
		for(var i = 0; i < this.rows; i++) {
			this.tiles[i] = [];
			for (var j = 0; j < this.cols; j++) {
				var blocked = fabric.util.getRandomInt(0, 100) < 30; // 30 is percent of blocked tiles
				var state = (blocked) ? AreaTile.STATE_BLOCKED : AreaTile.STATE_FREE;
				var tile = new AreaTile(j * AreaTile.SIZE, i * AreaTile.SIZE, state, this.canvas);
				tile.prop('note', i + ',' + j);
				tile.prop('row', i);
				tile.prop('col', j);
				this.tiles[i][j] = tile;
			}
		}
	},
	iterateTiles: function(callback) {
		for(var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				callback(this.tiles[i][j]);
			}
		}
	},
	draw: function() {
		this.iterateTiles(function(tile){ tile.draw(); });
		this.canvas.renderAll();
	}
});
*/