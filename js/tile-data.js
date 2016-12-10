/*
Кодирование тайла:
	G - ground (трава)
	R - road (дорога), C - crossroads (перекресток, конечная точка дороги)
	T - town (город)
	M - monastery (монастырь)
}

Проверка на совмещение должна происходить по 3м точкам каждой из сторон тайла
*/

var TILES = {
	't1': [
		'ZTTTTTZ',
		'GGGGGGG',
		'GGGGGGG',
		'GGGGGGG',
		'GGGGGGG',
		'GGGGGGG',
		'ZGGGGGZ'
	],
	't12': [
		'ZTTTTTZ',
		'GGGGGGT',
		'GGGGGGT',
		'GGGGGGT',
		'GGGGGGT',
		'GGGGGGT',
		'ZGGGGGZ'
	],
	't13': [
		'ZTTTTTZ',
		'GGGGGGG',
		'GGGGGGG',
		'GGGGGGG',
		'GGGGGGG',
		'GGGGGGG',
		'ZTTTTTZ'
	],
	't1-r23': [
		'ZTTTTTZ',
		'GGGGGGG',
		'GGGGGGG',
		'GGGRRRR',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	't1-r34': [
		'ZTTTTTZ',
		'GGGGGGG',
		'GGGGGGG',
		'RRRRGGG',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	't1-r234': [
		'ZTTTTTZ',
		'GGGGGGG',
		'GGGGGGG',
		'RRRCRRR',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	't1-r24': [ // начальный тайл
		'ZTTTTTZ',
		'GGGGGGG',
		'GGGGGGG',
		'RRRRRRR',
		'GGGGGGG',
		'GGGGGGG',
		'ZGGGGGZ'
	],
	't14': [
		'ZTTTTTZ',
		'TTGGGGG',
		'TGGGGGG',
		'TGGGGGG',
		'TGGGGGG',
		'TGGGGGG',
		'ZGGGGGZ'
	],
	't14-r23': [
		'ZTTTTTZ',
		'TTGGGGG',
		'TGGGGGG',
		'TGGRRRR',
		'TGGRGGG',
		'TGGRGGG',
		'ZGGRGGZ'
	],
	't24': [
		'ZGGGGGZ',
		'TGGGGGT',
		'TGGGGGT',
		'TTTTTTT',
		'TGGGGGT',
		'TGGGGGT',
		'ZGGGGGZ'
	],
	't124': [
		'ZTTTTTZ',
		'TTTTTTT',
		'TTTTTTT',
		'TGGGGGT',
		'TGGGGGT',
		'TGGGGGT',
		'ZGGGGGZ'
	],
	't124-r3': [
		'ZTTTTTZ',
		'TTTTTTT',
		'TTTTTTT',
		'TGGCGGT',
		'TGGRGGT',
		'TGGRGGT',
		'ZGGRGGZ'
	],
	't1234-s': [
		'ZTTTTTZ',
		'TTTTTTT',
		'TTTTTTT',
		'TTTTTTT',
		'TTTTTTT',
		'TTTTTTT',
		'ZTTTTTZ'
	],
	'm': [
		'ZGGGGGZ',
		'GGGGGGG',
		'GGGGGGG',
		'GGGMGGG',
		'GGGGGGG',
		'GGGGGGG',
		'ZGGGGGZ'
	],
	'm-r3': [
		'ZGGGGGZ',
		'GGGGGGG',
		'GGGGGGG',
		'GGGMGGG',
		'GGGCGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	'r13': [
		'ZGGRGGZ',
		'GGGRGGG',
		'GGGRGGG',
		'GGGRGGG',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	'r34': [
		'ZGGGGGZ',
		'GGGGGGG',
		'GGGGGGG',
		'RRRRGGG',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	'r234': [
		'ZGGGGGZ',
		'GGGGGGG',
		'GGGGGGG',
		'RRRCRRR',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
	],
	'r1234': [
		'ZGGRGGZ',
		'GGGRGGG',
		'GGGRGGG',
		'RRRCRRR',
		'GGGRGGG',
		'GGGRGGG',
		'ZGGRGGZ'
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