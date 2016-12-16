var MipleSet = createClass({
	construct: function () {
	},

	init: function ($map, areaMap, tilePos, tileData, callback) {
		this.areaMap = areaMap;
		this.tilePos = tilePos;
		this.tileData = tileData;
		this.$map = $map;
		this.callback = callback;

		this.isMagnet = false;
	},

	getSlotId: function (row, col) {
		return 'slot-' + row + '_' + col;
	},

	getMipleId: function (row, col) {
		return 'miple-' + row + '_' + col;
	},

	getSlotPos: function (i, j) {
		// вычисл€ем позицию мипла/слота по матрице тайла
		var stepX = this.areaMap.TILE / this.tileData.length, stepY = this.areaMap.TILE / this.tileData[0].length;
		return {
			left: parseInt(this.tilePos.left + j * stepX - stepX / 2),
			top: parseInt(this.tilePos.top + i * stepY - stepY / 2)
		};
	},

	drawSlot: function (i, j) {
		var pos = this.getSlotPos(i, j);
		var style = {
			left: pos.left + 'px',
			top: pos.top + 'px'
		};

		var $map = this.$context().map;
		$map.append(Format.img({src: '/img/miple/miple-slot.png', class: 'miple miple-slot', style: style, id: this.getSlotId(i, j)}));
		$map.append(Format.img({src: '/img/blank.gif', class: 'miple magnet', style: style, 'data-row': i, 'data-col': j}));
		$map.append(Format.img({src: '/img/miple/red/knight2.png', class: 'miple hidden', style: style, id: this.getMipleId(i, j)}));
	},

	draw: function () {
		for(var i = 0 ; i < this.tileData.length; i++) {
			for (var j = 0; j < this.tileData[i].length; j++) {
				if (in_array(this.tileData[i][j], ['G', 'T', 'R', 'M'])) {
					this.drawSlot(i, j);
				}
			}
		}
	},

	addCursor: function () {
		this.$context().map.append(Format.img({src: '/img/miple/red/knight2.png', id: 'miple-cursor', class: 'miple'}));
	} ,

	setCursorPos: function (pos) {
		var $e = this.$context();
		cssPx($e.cursor, 'top', pos.y);
		cssPx($e.cursor, 'left', pos.x);
	},

	getCursorPos: function (e) {
		var $e = this.$context();
		return {x: e.pageX - this.areaMap.LEFT - cssPx($e.map, 'left'), y: e.pageY - this.areaMap.TOP - cssPx($e.map, 'top')};
	},

	$context: function () {
		return {map: this.$map, cursor: $('#miple-cursor', this.$map), magnet: $('.miple.magnet', this.$map), slots: $('.miple-slot')};
	},

	show: function (e) {
		this.draw();
		this.addCursor();
		this.initEvents();
		this.mouseenter(e);
	},

	getSlotData: function(magnet) {
		var row = $(magnet).data('row'), col = $(magnet).data('col');
		return {
			id: this.getSlotId(row, col),
			left: parseInt(cssPx(magnet, 'left')),
			top: parseInt(cssPx(magnet, 'top')),
			row: row,
			col: col
		};
	},

	initEvents: function() {
		var self = this;
		var $map = this.$context().map;
		$map.mouseenter(function(e){
			self.mouseenter(e);
		});
		$map.mouseleave(function(e){
			self.mouseleave(e);
		});
	},

	mouseenter: function(e) {
		var self = this;
		var $e = self.$context();
		$e.map.css('cursor', 'none');
		self.setCursorPos(self.getCursorPos(e));
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
			console.log('magnet.mouseenter');
			e.stopPropagation();
			self.isMagnet = true;
			var slot = self.getSlotData(e.target);
			cssPx($e.cursor, 'top', slot.top);
			cssPx($e.cursor, 'left', slot.left);
			$('#' + self.getSlotId(slot.row, slot.col)).hide();
		});
		$e.magnet.bind('mouseleave', function(e){
			console.log('magnet.mouseleave');
			e.stopPropagation();
			self.isMagnet = false;
			self.$context().slots.show();
		});
		$e.magnet.bind('click', function(e){
			e.stopPropagation();
			console.log('click');
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

	click: function (e) {
		var $e = this.$context(), pos = this.getCursorPos(e);
		this.mouseleave();
		$e.map.unbind('mouseenter');
		$e.map.unbind('mouseleave');
		$e.slots.hide();
		var slot = this.getSlotData(e.target);
		$('#' + this.getMipleId(slot.row, slot.col)).show();
		this.callback(slot);
	}
});
