var TileMap = createClass({
	construct: function(tiles){
		this.isLasso = false;
		this.mapTiles = tiles;
		this.map = '#map';
	},

	init: function () {
		var tiles = {rows: this.mapTiles.length, cols: this.mapTiles[0].length};
		// var pos = {w: Math.round((MAP.W - MAP.TILE * tiles.cols) / 2), h: Math.round((MAP.H - MAP.TILE * tiles.rows) / 2)};
		MAP.Z_LEFT = Math.round((MAP.W - MAP.TILE * tiles.cols) / 2);
		MAP.Z_TOP = Math.round((MAP.H - MAP.TILE * tiles.rows) / 2);
		// insertTile('t1-r24', pos);
	},

	insertTile: function (tile, pos) {
		var img = Format.img({class: 'tile', src: getImgName(tile), style: 'top: ' + pos.h + 'px; left: ' + pos.w + 'px'});
		$map = $(this.map);
		$map.append(img);
		if (tile == 'slot') {
			var lasso = Format.img({
				class: 'lasso',
				src: '/img/blank.gif',
				'data-row': pos.row,
				'data-col': pos.col,
				style: 'top: ' + (pos.h - MAP.LASSO) + 'px; left: ' + (pos.w - MAP.LASSO) + 'px; width: ' + MAP.LASSO * 2 + 'px; height: ' + MAP.LASSO * 2 + 'px; z-index: 5'
			});
			$map.append(lasso);
		}
	},

	drawMap: function () {
		var pos = {w: 0, h: 0};
		for(var i = 0; i < this.mapTiles.length; i++) {
			pos.w = 0;
			for(var j = 0; j < this.mapTiles[i].length; j++) {
				var tile = this.mapTiles[i][j];
				if (tile) {
					// this.insertTile(tile, {w: MAP.Z_LEFT + pos.w, h: MAP.Z_TOP + pos.h, row: i, col: j});
					this.insertTile(tile, {w: MAP.Z_LEFT + pos.w, h: MAP.Z_TOP + pos.h, row: i, col: j});
				}
				pos.w+= MAP.TILE;
			}
			pos.h+= MAP.TILE;
		}
	},

	clearMap: function () {
		$map.html('');
		/*
		 $('#map .tile').remove();
		 $('#map .lasso').remove();
		 */
	},

	getSlotData: function(lasso) {
		return {
			left: parseInt(cssPx(lasso, 'left') + MAP.LASSO),
			top: parseInt(cssPx(lasso, 'top') + MAP.LASSO),
			row: $(lasso).data('row'),
			col: $(lasso).data('col')
		};
	},

	initEvents: function() {
		var self = this;
		var $map = $(this.map);
		$map.mouseenter(function(){
			var $cursor = $('#cursor', $map);
			var $lasso = $('.lasso', $map);

			console.log('map.mouseenter');
			$map.css('cursor', 'none');
			$cursor.attr('src', getImgName(currTile));
			self.isLasso = false;
			$map.bind('mousemove', function(e){
				$cursor.show();
				if (!self.isLasso) {
					var posX = e.pageX - MAP.LEFT - cssPx('#map', 'left'), posY = e.pageY - MAP.TOP - cssPx('#map', 'top');
					cssPx($cursor, 'top', posY);
					cssPx($cursor, 'left', posX);
				}
			});
			$lasso.bind('mouseenter', function(e){
				e.stopPropagation();
				self.isLasso = true;
				var slot = self.getSlotData(e.target);
				cssPx($cursor, 'top', slot.top);
				cssPx($cursor, 'left', slot.left);
			});
			$lasso.bind('mouseleave', function(e){
				e.stopPropagation();
				self.isLasso = false;
			});
			$lasso.bind('click', function(e){
				e.stopPropagation();
				self.isLasso = false;
				$map.mouseleave();
				var slot = self.getSlotData(e.target);
				self.mapTiles[slot.row][slot.col] = currTile;
				self.clearMap();
				$map.append(Format.img({id: 'cursor', class: 'tile', src: getImgName(currTile), style: 'display: none'})); // add cursor
				$cursor = $('#cursor', $map);
				cursor = $cursor.get(0);
				// TODO:
				// 1. pass turn to another player
				// 2. extend map for another slots
				self.drawMap();
				// 3. re-center map
				// self.initEvents();
			});
		});
		$map.mouseleave(function(){
			var $cursor = $('#cursor', $map);
			var $lasso = $('.lasso', $map);
			// $map.css('cursor', 'url(/img/cursor/normal.png), auto');
			console.log('map.mouseleave');
			$cursor.hide();
			$map.unbind('mousemove');
			$lasso.unbind('mouseenter');
			$lasso.unbind('mouseleave');
			$lasso.unbind('click');
		});
		$map.contextmenu(function(){
			console.log('contextmenu', this);
			return false;
		});

	}
});
