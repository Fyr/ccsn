var Wave = createClass({

	abstract: 'traceWave',

	construct: function (moveMx) {
		this.sx = moveMx; // matrix of allowed moves, usually 1 cell = 1 move
		this.count = 0;

		// init wave matrix - fill with zero-wave (free to go)
		this.wx = [];
		for(var i = 0; i < this.sx.getRows(); i++) {
			this.wx[i] = [];
			for(var j = 0; j < this.sx.getCols(); j++) {
				this.wx[i].push(0);
			}
		}
	},

	// Checks if wave can reach point [i, j] with nW-front (step)
	checkWave: function (i, j, nW) {
		return (this.sx[i][j] > 0 && (!this.wx[i][j] || this.wx[i][j] > nW));
	},

	// Generates new front of wave from set of points (old front)
	runWave: function(nW, aFront, fnStopWave) {
		var i, point, aNewFront = [];
		this.count = nW;
		for (i = 0; i < aFront.length; i++) {
			point = aFront[i];
			this.traceWave(point.i, point.j, nW, aNewFront);
		}
		if (aNewFront.length) { // stop-condition

			// check new front
			for(i = 0; i < aNewFront.length; i++) {
				point = aNewFront[i];
				if (fnStopWave(point.i, point.j, nW, aNewFront)) {
					return;
				}
			}
			this.runWave(nW + 1, aNewFront, fnStopWave);
		}
	},

	// Launch wave and get back wave-matrix
	getWaveMx: function(i, j, fnStopWave) {
		this.sx[i][j] = 0; // original point is unavailable
		if (!isset(fnStopWave)) {
			console.log('!');
			fnStopWave = function(i, j, nW, front) {
				return false;
			}
		}
		// this.fnStopWave = fnStopWave;
		this.runWave(1, [{i: i, j: j}], fnStopWave);
		return this.wx;
	}
});

// Strategy for 4 directions wave
var Wave4Dir = createClass({extends: Wave,

	traceWave: function(i, j, nW, aWaveFront) {
		// check top
		// $('#log').append(++this.count + '. trace ' + i + ' ' + j + ' wave: ' + this.wx[i][j] + '<br>');
		if (i > 0 && this.checkWave(i - 1, j, nW)) {
			this.wx[i - 1][j] = nW;
			aWaveFront.push({i: i - 1, j: j});
		}

		// check right
		if ((j + 1) < this.wx.getCols() && this.checkWave(i, j + 1, nW)) {
			this.wx[i][j + 1] = nW;
			aWaveFront.push({i: i, j: j + 1});
		}

		// check bottom
		if ((i + 1) < this.wx.getRows() && this.checkWave(i + 1, j, nW)) {
			this.wx[i + 1][j] = nW;
			aWaveFront.push({i: i + 1, j: j});
		}

		// check left
		if (j > 0 && this.checkWave(i, j - 1, nW)) {
			this.wx[i][j - 1] = nW;
			aWaveFront.push({i: i, j: j - 1});
		}
	}
});