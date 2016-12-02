var TileMap = createClass({
	construct: function (eMap, areaMap, tiles, activeTile) {
		this.isLasso = false;
		this.tiles = tiles;
		this.areaMap = areaMap;
		this.map = {e: eMap, left: 0, top: 0};
		this.activeTile = activeTile;
		this.rotate = 0;
	},

	init: function () {
		var tiles = {rows: this.tiles.length, cols: this.tiles[0].length};

		cssPx(this.map.e, 'width', this.areaMap.W + 200); // пока сделал специально больше чем area - test на скроллинг карты внутри Area
		cssPx(this.map.e, 'height', this.areaMap.H + 100);

		this.map.left = Math.round((this.areaMap.W - this.areaMap.TILE * tiles.cols) / 2);
		this.map.top = Math.round((this.areaMap.H - this.areaMap.TILE * tiles.rows) / 2);

		// insertTile('t1-r24', pos);
	},

	addCursor: function() {
		$(this.map.e).append(Format.img({src: getImgName(this.activeTile), id: 'cursor', class: 'tile'}));
		// $(this.map.e).append(Format.img({src: '/img/cursor/mouse.png', id: 'subcursor', class: 'tile'}));
	},

	drawTile: function (tile, pos) {
		var img = Format.img({class: 'tile', src: getImgName(tile), style: 'top: ' + pos.h + 'px; left: ' + pos.w + 'px'});
		$map = $(this.map.e);
		$map.append(img);
		if (tile == 'slot') {
			var lasso = Format.img({
				class: 'lasso',
				src: '/img/blank.gif',
				'data-row': pos.row,
				'data-col': pos.col,
				style: 'top: ' + (pos.h - this.areaMap.LASSO) + 'px; left: ' + (pos.w - this.areaMap.LASSO) + 'px; width: ' + this.areaMap.LASSO * 2 + 'px; height: ' + this.areaMap.LASSO * 2 + 'px; z-index: 5'
			});
			$map.append(lasso);
		}
	},

	drawMap: function () {
		for(var i = 0; i < this.tiles.length; i++) {
			for(var j = 0; j < this.tiles[i].length; j++) {
				var tile = this.tiles[i][j];
				if (tile) {
					// this.insertTile(tile, {w: this.map.left + pos.w, h: this.map.top + pos.h, row: i, col: j});
					this.drawTile(tile, {w: this.map.left + j * this.areaMap.TILE, h: this.map.top + i * this.areaMap.TILE, row: i, col: j});
				}
			}
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
			left: parseInt(cssPx(lasso, 'left') + this.areaMap.LASSO),
			top: parseInt(cssPx(lasso, 'top') + this.areaMap.LASSO),
			row: $(lasso).data('row'),
			col: $(lasso).data('col')
		};
	},

	$context: function() {
		return {map: $(this.map.e), cursor: $('#cursor', this.map.e), lasso: $('.lasso', this.map.e), subcursor: $('#subcursor', this.map.e)};
	},

	show: function() {
		this.init();
		this.drawMap();
		this.addCursor();
		this.initEvents();
	},

	initEvents: function() {
		var self = this;
		var $map = this.$context().map;
		$map.mouseenter(function(){
			var $e = self.$context();
			console.log('map.mouseenter');
			$e.map.css('cursor', 'none');
			$e.cursor.attr('src', getImgName(currTile));
			self.isLasso = false;
			$e.map.bind('mousemove', function(e){
				$e.cursor.show();
				$e.subcursor.show();
				if (!self.isLasso) {
					var posX = e.pageX - self.areaMap.LEFT - cssPx($e.map, 'left'), posY = e.pageY - self.areaMap.TOP - cssPx($e.map, 'top');
					cssPx($e.cursor, 'top', posY);
					cssPx($e.cursor, 'left', posX);
					/*
					cssPx($e.subcursor, 'top', posY + 32);
					cssPx($e.subcursor, 'left', posX + 32);
					*/
				}
			});
			$e.lasso.bind('mouseenter', function(e){
				e.stopPropagation();
				self.isLasso = true;
				var slot = self.getSlotData(e.target);
				cssPx($e.cursor, 'top', slot.top);
				cssPx($e.cursor, 'left', slot.left);
				/*
				cssPx($e.subcursor, 'top', slot.top + 32);
				cssPx($e.subcursor, 'left', slot.left + 32);
				*/
			});
			$e.lasso.bind('mouseleave', function(e){
				e.stopPropagation();
				self.isLasso = false;
			});
			$e.lasso.bind('click', function(e){
				e.stopPropagation();
				self.isLasso = false;
				$e.map.mouseleave();
				var slot = self.getSlotData(e.target);
				self.tiles[slot.row][slot.col] = currTile;

				self.clearMap();
				self.show();
			});
		});
		$map.mouseleave(function(){
			var $cursor = self.$context().cursor;
			var $lasso = self.$context().lasso;
			$cursor.hide();
			$map.unbind('mousemove');
			$lasso.unbind('mouseenter');
			$lasso.unbind('mouseleave');
			$lasso.unbind('click');
		});
		$map.contextmenu(function(){
			console.log('contextmenu', this);
			self.rotateTile();
			return false;
		});

	},

	rotateTile: function () {
		this.rotate++;
		if (this.rotate > 3) {
			this.rotate = 0;
		}

		$cursor = this.$context().cursor;

		$cursor.removeClass('rotate1');
		$cursor.removeClass('rotate2');
		$cursor.removeClass('rotate3');

		if (this.rotate) {
			$cursor.addClass('rotate' + this.rotate);
		}
	}
});
