var TileMap = createClass({
	construct: function (eMap, areaMap, tileSet, mipleSet, theme) {
		this.map = {e: eMap, left: 0, top: 0};
		this.areaMap = areaMap;
		this.tileSet = tileSet;
		this.mipleSet = mipleSet;
		this.theme = theme;

		this.isMagnet = false;
		this.init();
	},

	init: function () {
		var $e = this.$context();

		this.tileSet.extend();
		/*
		cssPx($e.map, 'width', this.areaMap.W + 200); // ���� ������ ���������� ������ ��� area - test �� ��������� ����� ������ Area
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

	getCursorPos: function (e) {
		var $e = this.$context();
		return {x: e.pageX - this.areaMap.LEFT - cssPx($e.map, 'left'), y: e.pageY - this.areaMap.TOP - cssPx($e.map, 'top')};
	},

	setCursorPos: function (pos) {
		var $e = this.$context();
		cssPx($e.cursor, 'top', pos.y);
		cssPx($e.cursor, 'left', pos.x);
	},

	getTilePos: function (row, col) {
		return {left: this.map.left + col * this.areaMap.TILE, top: this.map.top + row * this.areaMap.TILE};
	},

	drawTile: function (tile, row, col) {
		var img = this.getTileImage(tile);
		var pos = this.getTilePos(row, col);
		var $map = this.$context().map;
		$map.append(Format.img({class: img.class, src: img.src, style: 'top: ' + pos.top + 'px; left: ' + pos.left + 'px'}));
		if (tile == 'slot') {
			var magnet = Format.img({
				class: 'magnet',
				src: '/img/blank.gif',
				'data-row': row,
				'data-col': col,
				style: {
					top: (pos.top - this.areaMap.MAGNET) + 'px',
					left: (pos.left - this.areaMap.MAGNET) + 'px',
					width: (this.areaMap.MAGNET * 2) + 'px',
					height: (this.areaMap.MAGNET * 2) + 'px',
				}
			});
			$map.append(magnet);
		}
	},

	/*
	getImgSrc: function (tile) {
		return '/img/tiles/tile-' + tile + '.png';
	},

	// dir = 0..3;
	getImgClass: function (dir) {
		return (dir > 0) ? 'tile rotate' + dir : 'tile';
	},
	*/

	getTileImage: function (tile) {
		var e = tile.split('|');
		return this.getTheme().getTile(e[0], e.length > 1 ? e[1] : 0);
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
		 $('#map .magnet').remove();
		 */
	},

	getSlotData: function(magnet) {
		return {
			left: parseInt(cssPx(magnet, 'left') + this.areaMap.MAGNET),
			top: parseInt(cssPx(magnet, 'top') + this.areaMap.MAGNET),
			row: $(magnet).data('row'),
			col: $(magnet).data('col')
		};
	},

	$context: function() {
		return {map: $(this.map.e), cursor: $('#cursor', this.map.e), magnet: $('.magnet', this.map.e), subcursor: $('#subcursor', this.map.e)};
	},

	show: function(slot) {
		this.tileSet.clearSlots();
		this.tileSet.extend();
		this.tileSet.calcActiveSlots();
		this.clearMap();
		this.checkBounds(slot);
		this.drawMap();
		this.addCursor();
		// this.addMiple();
		this.initEvents();
	},

	initEvents: function() {
		var self = this;
		var $map = this.$context().map;
		$map.mouseenter(function(e){
			// console.log('mouseenter');
			self.mouseenter(e);
		});
		$map.mouseleave(function(e){
			// console.log('mouseleave');
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
		self.isMagnet = false;
		$e.map.bind('mousemove', function(e){
			e.stopPropagation();
			$e.cursor.show();
			if (!self.isMagnet) {
				self.setCursorPos(self.getCursorPos(e));
			}
		});
		$e.map.bind('contextmenu', function(e){
			e.stopPropagation();
			self.rotateTile(e);
			return false;
		});
		$e.magnet.bind('mouseenter', function(e){
			e.stopPropagation();
			self.isMagnet = true;
			var slot = self.getSlotData(e.target);
			cssPx($e.cursor, 'top', slot.top);
			cssPx($e.cursor, 'left', slot.left);
		});
		$e.magnet.bind('mouseleave', function(e){
			e.stopPropagation();
			self.isMagnet = false;
		});
		$e.magnet.bind('click', function(e){
			e.stopPropagation();
			self.click(e);
		});
	},

	mouseleave: function(e) {
		var $e = this.$context();
		$e.cursor.hide();
		$e.map.unbind('mousemove');
		$e.map.unbind('contextmenu');
		$e.magnet.unbind('mouseenter');
		$e.magnet.unbind('mouseleave');
		$e.magnet.unbind('click');
	},

	rotateTile: function (e) {
		this.isMagnet = false;
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
		var self = this;

		this.isMagnet = false;
		var $e = this.$context(), pos = this.getCursorPos(e);
		this.mouseleave();
		$e.map.unbind('mouseenter');
		$e.map.unbind('mouseleave');
		var slot = this.getSlotData(e.target);
		var tile = this.tileSet.getActiveTile();
		this.tileSet.setTile(slot.row, slot.col, tile);
		this.drawTile(tile, slot.row, slot.col);
		/* ������ �������� ����.���
		this.show(slot);
		this.setCursorPos(pos);
		*/
		this.mouseleave();
		// this.show(slot);

		// �� ���� MipleSet ����� ������ ����� � ����� ������ this.mipleSet = new MipleSet();
		// �� ����� ����������� ������� ���� Dependency Injection � ������ �������� ������ ���, ��� ������������ ������
		var tilePos = this.getTilePos(slot.row, slot.col);
		var tileData = this.tileSet.getTileData(tile);
		this.mipleSet.init(this.$context().map, this.areaMap, tilePos, tileData, this.getTheme(), function (mipleSlot) { self.mipleSetCallback(slot, mipleSlot); });
		this.mipleSet.show(e);

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
	},

	mipleSetCallback: function (slot, mipleSlot) {
		console.log(this.tileSet.getActiveTile(), slot, mipleSlot);
		this.$context().map.css('cursor', 'normal');
		this.$context().map.addClass('wait');
	},

	getTheme: function () {
		return this.theme;
	}
});
