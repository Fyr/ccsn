var TileMap = createClass({
	construct: function (eMap, areaMap, tileSet) {
		this.isLasso = false;
		this.tileSet = tileSet;
		this.areaMap = areaMap;
		this.map = {e: eMap, left: 0, top: 0};

		this.init();
	},

	init: function () {
		var $e = this.$context();

		this.tileSet.extend();
		/*
		cssPx($e.map, 'width', this.areaMap.W + 200); // пока сделал специально больше чем area - test на скроллинг карты внутри Area
		cssPx($e.map, 'height', this.areaMap.H + 100);
		*/
		// this.checkBounds();
		this.map.left = Math.round((this.areaMap.W - this.areaMap.TILE * this.tileSet.getCols()) / 2);
		this.map.top = Math.round((this.areaMap.H - this.areaMap.TILE * this.tileSet.getRows()) / 2);
	},

	addCursor: function(pos) {
		var tile = this.getTileImage(this.tileSet.getActiveTile());
		var $e = this.$context();
		$e.map.append(Format.img({src: tile.src, id: 'cursor', class: tile.class}));
		if (pos) {
			this.setCursorPos(pos);
		}
		// $(this.map.e).append(Format.img({src: '/img/cursor/mouse.png', id: 'subcursor', class: 'tile'}));
	},

	addMiple: function () {
		var $e = this.$context();
		// $e.map.append(Format.img({src: '/img/miple/red/knight.png', class: 'miple', style: 'left: 270px; top: 170px; '}));

		$e.map.append(Format.img({src: '/img/miple/red/knight2.png', class: 'miple', style: 'left: 270px; top: 170px; '}));
		// $e.map.append(Format.img({src: '/img/miple/red/robber2.png', class: 'miple', style: 'left: 250px; top: 185px; '}));
		$e.map.append(Format.img({src: '/img/miple/miple-slot.png', class: 'miple', style: 'left: 290px; top: 185px; width: auto;'}));

	},

	getCursorPos: function (e) {
		var $e = this.$context();
		return {x: e.pageX - this.areaMap.LEFT - cssPx($e.map, 'left'), y: e.pageY - this.areaMap.TOP - cssPx($e.map, 'top')};
	},

	setCursorPos: function (pos) {
		var $e = this.$context();
		cssPx($e.cursor, 'top', pos.y);
		cssPx($e.cursor, 'left', pos.x);
	},

	drawTile: function (tile, row, col) {
		var img = this.getTileImage(tile);
		var pos = {w: this.map.left + col * this.areaMap.TILE, h: this.map.top + row * this.areaMap.TILE};
		var $map = this.$context().map;
		$map.append(Format.img({class: img.class, src: img.src, style: 'top: ' + pos.h + 'px; left: ' + pos.w + 'px'}));
		if (tile == 'slot') {
			var lasso = Format.img({
				class: 'lasso',
				src: '/img/blank.gif',
				'data-row': row,
				'data-col': col,
				style: 'top: ' + (pos.h - this.areaMap.LASSO) + 'px; left: ' + (pos.w - this.areaMap.LASSO) + 'px; width: ' + this.areaMap.LASSO * 2 + 'px; height: ' + this.areaMap.LASSO * 2 + 'px; z-index: 5'
			});
			$map.append(lasso);
		}
	},

	getImgSrc: function (tile) {
		return '/img/tiles/tile-' + tile + '.png';
	},

	// dir = 0..3;
	getImgClass: function (dir) {
		return (dir > 0) ? 'tile rotate' + dir : 'tile';
	},

	getTileImage: function (tile) {
		var e = tile.split('|');
		return {src: this.getImgSrc(e[0]), class: this.getImgClass(e.length > 1 ? e[1] : 0)};
	},

	drawMap: function () {
		for(var i = 0; i < this.tileSet.getRows(); i++) {
			for(var j = 0; j < this.tileSet.getCols(); j++) {
				var tile = this.tileSet.getTile(i, j);
				if (tile) {
					this.drawTile(tile, i, j);
				}
			}
		}
	},

	clearMap: function () {
		var $map = this.$context().map;
		$map.unbind('mouseenter');
		$map.unbind('mouseleave');
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

	show: function(slot) {
		this.tileSet.clearSlots();
		this.tileSet.extend();
		this.tileSet.calcActiveSlots();
		this.clearMap();
		this.checkBounds(slot);
		this.drawMap();
		this.addCursor();
		this.addMiple();
		this.initEvents();
	},

	initEvents: function() {
		var self = this;
		var $map = this.$context().map;
		$map.mouseenter(function(e){
			console.log('mouseenter');
			self.mouseenter(e);
		});
		$map.mouseleave(function(e){
			console.log('mouseleave');
			self.mouseleave(e);
		});
	},

	mouseenter: function(e) {
		var self = this;
		var $e = self.$context();
		$e.map.css('cursor', 'none');
		self.setCursorPos(self.getCursorPos(e));
		$e.cursor.attr('src', this.getTileImage(this.tileSet.getActiveTile()).src);
		$e.cursor.show();
		self.isLasso = false;
		$e.map.bind('mousemove', function(e){
			e.stopPropagation();
			$e.cursor.show();
			if (!self.isLasso) {
				self.setCursorPos(self.getCursorPos(e));
			}
		});
		$e.map.bind('contextmenu', function(e){
			e.stopPropagation();
			self.rotateTile(e);
			return false;
		});
		$e.lasso.bind('mouseenter', function(e){
			e.stopPropagation();
			self.isLasso = true;
			var slot = self.getSlotData(e.target);
			cssPx($e.cursor, 'top', slot.top);
			cssPx($e.cursor, 'left', slot.left);
		});
		$e.lasso.bind('mouseleave', function(e){
			e.stopPropagation();
			self.isLasso = false;
		});
		$e.lasso.bind('click', function(e){
			e.stopPropagation();
			self.click(e);
		});
	},

	mouseleave: function(e) {
		var $e = this.$context();
		$e.cursor.hide();
		$e.map.unbind('mousemove');
		$e.map.unbind('contextmenu');
		$e.lasso.unbind('mouseenter');
		$e.lasso.unbind('mouseleave');
		$e.lasso.unbind('click');
	},

	rotateTile: function (e) {
		this.isLasso = false;
		var $e = this.$context(), pos = this.getCursorPos(e);
		this.mouseleave();
		$e.map.unbind('mouseenter');
		$e.map.unbind('mouseleave');
		this.tileSet.rotate();
		// this.clearMap();
		this.show();
		this.mouseenter(e);
	},
	
	click: function (e) {
		this.isLasso = false;
		var $e = this.$context(), pos = this.getCursorPos(e);
		this.mouseleave();
		$e.map.unbind('mouseenter');
		$e.map.unbind('mouseleave');
		var slot = this.getSlotData(e.target);
		// this.tileSet.clearSlots();
		this.tileSet.setTile(slot.row, slot.col, this.tileSet.getActiveTile());
		// this.tileSet.extend();
		// this.checkBounds();
		// this.clearMap();
		this.show(slot);
		this.setCursorPos(pos);
	},

	checkBounds: function (slot) {
		if (slot && slot.row == 0) {
			this.map.top-= this.areaMap.TILE;
			if (this.map.top < parseInt(this.areaMap.TILE / 2)) {
				this.map.top+= this.areaMap.TILE;
			}
		}
		if (slot && slot.col == 0) {
			this.map.left-= this.areaMap.TILE;
			if (this.map.left < parseInt(this.areaMap.TILE / 2)) {
				this.map.left+= this.areaMap.TILE;
			}
		}

		var map = {
			w: Math.max(this.areaMap.W, this.map.left + this.areaMap.TILE * (this.tileSet.getCols() + 1)),
			h: Math.max(this.areaMap.H, this.map.top + this.areaMap.TILE * (this.tileSet.getRows() + 1))
		}
		var $e = this.$context();
		if (cssPx($e.map, 'width') < map.w) {
			cssPx($e.map, 'width', map.w);
		}
		if (cssPx($e.map, 'height') < map.h) {
			cssPx($e.map, 'height', map.h);
		}
	}
});
