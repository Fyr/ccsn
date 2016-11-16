var TileSet = function(){
	var self = this;

	self.data = [];

	this.setData = function(data) {
		self.data = data;
	};

	this.getData = function() {
		return self.data;
	};

	this.extendData = function(w, h) {
		// if (h) {}
	};

	this.initTile = function () {
		var mapTiles = this.getData();
		var tiles = {h: mapTiles.length, w: mapTiles[0].length};
		var pos = {w: Math.round((MAP.W - MAP.TILE * tiles.w) / 2), h: Math.round((MAP.H - MAP.TILE * tiles.h) / 2)};
		MAP.Z_LEFT = pos.w;
		MAP.Z_TOP = pos.h;
		// insertTile('t1-r24', pos);
	};

	this.insertTile = function (tile, pos) {
		var img = Format.tag('img', {class: 'tile', src: getImgName(tile), alt: '', style: 'top: ' + pos.h + 'px; left: ' + pos.w + 'px'});
		$('#map').append(img);
	};

	this.drawMap = function () {
		var mapTiles = this.getData();
		var pos = {w: 0, h: 0};
		for(var i = 0; i < mapTiles.length; i++) {
			pos.w = 0;
			for(var j = 0; j < mapTiles[i].length; j++) {
				var tile = mapTiles[i][j];
				if (tile) {
					this.insertTile(tile, {w: pos.w + MAP.Z_LEFT, h: pos.h + MAP.Z_TOP});
				}
				pos.w+= MAP.TILE;
			}
			pos.h+= MAP.TILE;
		}
	};

	this.clearMap = function () {
		$('#map .tile').remove();
	};

	this.initEvents = function() {
		$('#map').mouseenter(function(){
			$('#map').css('cursor', 'url(' + getImgName(currTile) + '), auto');
			$('#map').bind('mousemove', function(e){
				console.log(e.pageX - MAP.LEFT, e.pageY - MAP.TOP);
			});
		});
		$('#map').mouseleave(function(){
			$('#map').css('cursor', 'url(/img/cursor/normal.png), auto');
			$('#map').unbind('mousemove');
		});
		$('#map').contextmenu(function(){

		});

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
}