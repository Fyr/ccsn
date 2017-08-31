QUnit.test("WaveMatrix tests", function (assert) {
	var sx = [
		[1,1,1,1,1,1,1,0,1,0],
		[1,1,1,1,0,1,1,1,1,1],
		[1,1,1,0,1,1,1,1,1,0],
		[1,1,1,1,1,0,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,1],
		[1,1,1,1,1,1,1,1,0,1],
		[1,1,1,1,1,1,0,1,0,1],
		[1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,0,1,0,1,1],
		[1,1,0,1,0,1,1,1,0,1]
	];
	var si = 0, sj = 6;
	var ws = new Wave4Dir(sx);
	var wx = ws.getWaveMx(si, sj);
	var expected = sx;
	assert.deepEqual(sx, expected, 'Get wave matrix from matrix of available moves');
});