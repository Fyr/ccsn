var TileSet = function(){
	var self = this;

	self.data = [['', 'slot', ''], ['slot', 't1-r24', 'slot'], ['', 'slot', '']];

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

	this.initTile = function () {
		var mapTiles = self.getData();
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
		var mapTiles = self.getData();
		var pos = {w: 0, h: 0};
		for(var i = 0; i < mapTiles.length; i++) {
			pos.w = 0;
			for(var j = 0; j < mapTiles[i].length; j++) {
				var tile = mapTiles[i][j];
				if (tile) {
					self.insertTile(tile, {w: pos.w + MAP.Z_LEFT, h: pos.h + MAP.Z_TOP});
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
			// $('#map').css('cursor', 'url(' + getImgName(currTile) + '), auto');
			$('#map #cursor').attr('src', getImgName(currTile));
			$('#map #cursor').show();
			$('#map').bind('mousemove', function(e){
				console.log(e.pageX - MAP.LEFT, e.pageY - MAP.TOP);
				var posX = e.pageX - MAP.LEFT - cssPx('#map', 'left'), posY = e.pageY - MAP.TOP - cssPx('#map', 'top');
				/*
				var qX = Math.floor(posX / MAP.TILE), qY = Math.floor(posY / MAP.TILE);
				var dX = posX - qX * MAP.TILE, dY = posY - qY * MAP.TILE;
				if (dX < MAP.LASSO) {
					posX = qX * MAP.TILE;
				}
				if (dY < MAP.LASSO) {
					posY = qY * MAP.TILE;
				}
				*/
				cssPx('#map #cursor', 'top', posY);
				cssPx('#map #cursor', 'left', posX);
			});
		});
		$('#map').mouseleave(function(){
			// $('#map').css('cursor', 'url(/img/cursor/normal.png), auto');
			$('#map #cursor').hide();
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

	}
}