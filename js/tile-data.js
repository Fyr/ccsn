/*
Кодирование тайла:
	g - ground (трава)
	r - road (дорога), C - crossroads (перекресток, конечная точка дороги)
	t - town (город)
	m - monastery (монастырь)
	Заглавная буква - место установки мипла на соотв.территоррию
*/

var TILES = {
	't1': [
		'ztttttz',
		'gggTggg',
		'ggggggg',
		'ggggggg',
		'gggGggg',
		'ggggggg',
		'zgggggz'
	],
	't12': [
		'zttTttz',
		'ggggggt',
		'ggggggt',
		'gGgggTt',
		'ggggggt',
		'ggggggt',
		'zgggggz'
	],
	't13': [
		'ztttttz',
		'gggTggg',
		'ggggggg',
		'gggGggg',
		'ggggggg',
		'gggTggg',
		'ztttttz'
	],
	't1-r23': [
		'ztttttz',
		'gggTggg',
		'Ggggggg',
		'gggRrrr',
		'gggrggg',
		'gggrggG',
		'zggrggz'
	],
	't1-r34': [
		'ztttttz',
		'gggTggg',
		'ggggggG',
		'rrrRggg',
		'gggrggg',
		'Gggrggg',
		'zggrggz'
	],
	't1-r234': [
		'zttTttz',
		'ggggggG',
		'ggggggg',
		'rRrcrRr',
		'gggrggg',
		'GggRggG',
		'zggrggz'
	],
	't1-r24': [ // начальный тайл
		'ztttttz',
		'gggTggg',
		'ggggggG',
		'rrrRrrr',
		'ggggggg',
		'gggGggg',
		'zgggggz'
	],
	't14': [
		'ztttttz',
		'tTggggg',
		'tgggggg',
		'tgggggg',
		'tgggGgg',
		'tgggggg',
		'zgggggz'
	],
	't14-r23': [
		'ztttttz',
		'tTggggg',
		'tgggggG',
		'tggRrrr',
		'tggrggg',
		'tggrggG',
		'zggrggz'
	],
	't24': [
		'zgggggz',
		'tggGggt',
		'tgggggt',
		'tttTttt',
		'tgggggt',
		'tggGggt',
		'zgggggz'
	],
	't124': [
		'ztttttz',
		'ttttttt',
		'ttttttt',
		'tgggggt',
		'tgggggt',
		'tgggggt',
		'zgggggz'
	],
	't124-r3': [
		'ztttttz',
		'tttTttt',
		'ttttttt',
		'tggcggt',
		'tggrggt',
		'tggRggt',
		'zGgrgGz'
	],
	't1234-s': [
		'ztttttz',
		'ttttttt',
		'ttttttt',
		'tttTttt',
		'ttttttt',
		'ttttttt',
		'ztttttz'
	],
	'm': [
		'zgggggz',
		'ggggggg',
		'ggggggg',
		'gggMggg',
		'ggggggg',
		'gggGggg',
		'zgggggz'
	],
	'm-r3': [
		'zgggggz',
		'gggGggg',
		'ggggggg',
		'gggMggg',
		'gggcggg',
		'gggRggg',
		'zggrggz'
	],
	'r13': [
		'zggrggz',
		'gggrggg',
		'gggrggg',
		'GggRggG',
		'gggrggg',
		'gggrggg',
		'zggrggz'
	],
	'r34': [
		'zgggggz',
		'gggggGg',
		'ggggggg',
		'rrrRggg',
		'gggrggg',
		'Gggrggg',
		'zggrggz'
	],
	'r234': [
		'zgggggz',
		'gggGggg',
		'ggggggg',
		'rRrcrRr',
		'gggrggg',
		'GggRggG',
		'zggrggz'
	],
	'r1234': [
		'zggrggz',
		'gGgRgGg',
		'gggrggg',
		'rRrcrRr',
		'gggrggg',
		'gGgRgGg',
		'zggrggz'
	]
};
var TileData = createClass({
	construct: function(data) {
		this.data = data;
		this.rows = 7;
		this.cols = 7;
	},

	decode: function (data) {
		var aData = [], s;
		for(var i = 0; i < this.rows; i++) {
			aData[i] = [];
			var s = data[i];
			for(var j = 0; j < this.cols; j++) {
				aData[i][j] = s[j];
			}
		}
		return aData;
	},

	getData: function (tile, dir) {
		var data = this.decode(this.data[tile]);
		for(var i = 1; i <= dir; i++) {
			data = this.rotate(data);
		}
		return data;
	},

	rotate: function (aTileData) {
		// поворот делается по часовой стрелке
		var data = [], _data;
		for(var j = 0; j < this.cols; j++) {
			_data = [];
			for(var i = this.rows - 1; i >= 0; i--) {
				_data.push(aTileData[i][j]);
			}
			data.push(_data);
		}
		return data;
	},

	getSide: function (aTileData, side) {
		var s = '', i, j;
		if (side == 1) {
			for (i = 0; i < this.rows; i++) {
				s += aTileData[i][this.cols - 1];
			}
		} else if (side == 2) {
			for (j = 0; j < this.cols; j++) {
				s += aTileData[this.rows - 1][j];
			}
		} else if (side == 3) {
			for (i = 0; i < this.rows; i++) {
				s += aTileData[i][0];
			}
		} else { // side == 0
			for (j = 0; j < this.cols; j++) {
				s += aTileData[0][j];
			}
		}
		return s;
	}

});