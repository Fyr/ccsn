/*
	Класс для базовых операций с данными тайла
*/

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