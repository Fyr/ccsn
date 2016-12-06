QUnit.test("TileData tests", function (assert) {
	var td = new TileData(TILES);
	expected = [
		['Z','T','T','T','T','T','Z'],
		['T','T','T','T','T','T','T'],
		['T','T','T','T','T','T','T'],
		['T','G','G','C','G','G','T'],
		['T','G','G','R','G','G','T'],
		['T','G','G','R','G','G','T'],
		['Z','G','G','R','G','G','Z']
	];
	assert.deepEqual(td.getData('t124-r3'), expected, 'Decode tile data (getData)');

	expected = [
		['Z','G','G','R','G','G','Z'],
		['G','G','G','R','G','G','T'],
		['G','G','G','R','G','G','T'],
		['R','R','R','C','G','G','T'],
		['G','G','G','R','G','G','T'],
		['G','G','G','R','G','G','T'],
		['Z','G','G','R','G','G','Z']
	];
	assert.deepEqual(td.getData('t1-r234', 1), expected, 'getData + rotate 1');

	expected = [
		['Z','G','G','R','G','G','Z'],
		['G','G','G','R','G','G','G'],
		['G','G','G','R','G','G','G'],
		['R','R','R','C','R','R','R'],
		['G','G','G','G','G','G','G'],
		['G','G','G','G','G','G','G'],
		['Z','T','T','T','T','T','Z']
	];
	assert.deepEqual(td.getData('t1-r234', 2), expected, 'getData + rotate 2');

	expected = [
		['Z','G','G','R','G','G','Z'],
		['T','G','G','R','G','G','G'],
		['T','G','G','R','G','G','G'],
		['T','G','G','C','R','R','R'],
		['T','G','G','R','G','G','G'],
		['T','G','G','R','G','G','G'],
		['Z','G','G','R','G','G','Z']
	];
	assert.deepEqual(td.getData('t1-r234', 3), expected, 'getData + rotate 3');
});