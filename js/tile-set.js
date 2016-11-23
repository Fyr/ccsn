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

	this.initTile = function () {
		var mapTiles = self.getData();
		var tiles = {h: mapTiles.length, w: mapTiles[0].length};
		var pos = {w: Math.round((MAP.W - MAP.TILE * tiles.w) / 2), h: Math.round((MAP.H - MAP.TILE * tiles.h) / 2)};
		MAP.Z_LEFT = pos.w;
		MAP.Z_TOP = pos.h;
		// insertTile('t1-r24', pos);
	};

	this.insertTile = function (tile, pos) {
		var img = Format.img({class: 'tile', src: getImgName(tile), style: 'top: ' + pos.h + 'px; left: ' + pos.w + 'px'});
		$('#map').append(img);
		if (tile == 'slot') {
			var lasso = Format.img({
				class: 'lasso',
				src: '/img/blank.gif',
				'data-row': pos.row,
				'data-col': pos.col,
				style: 'top: ' + (pos.h - MAP.LASSO) + 'px; left: ' + (pos.w - MAP.LASSO) + 'px; width: ' + MAP.LASSO * 2 + 'px; height: ' + MAP.LASSO * 2 + 'px; z-index: 5'
			});
			$('#map').append(lasso);
		}
	};

	this.drawMap = function () {
		var mapTiles = self.getData();
		var pos = {w: 0, h: 0};
		for(var i = 0; i < mapTiles.length; i++) {
			pos.w = 0;
			for(var j = 0; j < mapTiles[i].length; j++) {
				var tile = mapTiles[i][j];
				if (tile) {
					self.insertTile(tile, {w: pos.w + MAP.Z_LEFT, h: pos.h + MAP.Z_TOP, row: i, col: j});
				}
				pos.w+= MAP.TILE;
			}
			pos.h+= MAP.TILE;
		}
	};

	this.clearMap = function () {
		$('#map').html('');
		/*
		$('#map .tile').remove();
		$('#map .lasso').remove();
		*/
	};

	this.getSlotData = function(lasso) {
		return {
			left: parseInt(cssPx(lasso, 'left') + MAP.LASSO),
			top: parseInt(cssPx(lasso, 'top') + MAP.LASSO),
			row: $(lasso).data('row'),
			col: $(lasso).data('col')
		};
	};

	this.initEvents = function() {
		$('#map').mouseenter(function(){
			// $('#map').css('cursor', 'url(' + getImgName(currTile) + '), auto');
			$('#map #cursor').attr('src', getImgName(currTile));
			$('#map #cursor').show();
			self.isLasso = false;
			$('#map').bind('mousemove', function(e){
				if (!self.isLasso) {
					var posX = e.pageX - MAP.LEFT - cssPx('#map', 'left'), posY = e.pageY - MAP.TOP - cssPx('#map', 'top');
					cssPx('#map #cursor', 'top', posY);
					cssPx('#map #cursor', 'left', posX);
				}
			});
			$('#map .lasso').bind('mouseenter', function(e){
				e.stopPropagation();
				self.isLasso = true;
				var slot = self.getSlotData(e.target);
				cssPx('#map #cursor', 'top', slot.top);
				cssPx('#map #cursor', 'left', slot.left);
			});
			$('#map .lasso').bind('mouseleave', function(e){
				e.stopPropagation();
				self.isLasso = false;
			});
			$('#map .lasso').bind('click', function(e){
				e.stopPropagation();
				self.isLasso = false;
				$('#map').mouseleave();
				var slot = self.getSlotData(e.target);
				var mapTiles = self.getData();
				mapTiles[slot.row][slot.col] = currTile;
				self.setData(mapTiles);
				self.clearMap();
				$('#map').append(Format.img({id: 'cursor', class: 'tile', src: getImgName(currTile), style: 'display: none'})); // <img id="cursor" class="tile" src="./img/tiles/tile-t1-r24.png" alt="" />
				// TODO:
				// 1. pass turn to another player
				// 2. extend map for another slots
				self.drawMap();
				// 3. re-center map
				// self.initEvents();
			});
		});
		$('#map').mouseleave(function(){
			// $('#map').css('cursor', 'url(/img/cursor/normal.png), auto');
			$('#map #cursor').hide();
			$('#map').unbind('mousemove');
			$('#map .lasso').unbind('mouseenter');
			$('#map .lasso').unbind('mouseleave');
			$('#map .lasso').unbind('click');
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