var WaveMatrix = createClass({
	construct: function (sx, startPoint, waveStrategy, fnStop) {
		this.sx = sx;
		this.startPoint = startPoint;
		this.waveStategy = waveStrategy;
		this.fnStop = fnStop;

		this.init();
	},

	init: function () {
		this.wx = this.genWaveMatrix(this.sx);
		this.waveStategy.init(this.sx, this.wx);
	},

	genWaveMatrix: function (sx) {
		var wx = [];
		for(var i = 0; i < sx.getRows(); i++) {
			var row = [];
			for(var j = 0; j < sx.getCols(); j++) {
				row.push(0);
			}
			wx.push(row);
		}
		return wx;
	},
/*
	init: function () {
		var sx = [];
		for (var i = 0; i < mx.length; i++) {
			sx.push([]);
			for(var j = 0; j < mx[i].length; j++) {
				sx[i].push(-1);
			}
		}
	},
*/
});
