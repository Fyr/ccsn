QUnit.test("TileData tests", function (assert) {
	var td = new TileData(Tiles);
	expected = [
		['z','t','t','t','t','t','z'],
		['t','t','t','T','t','t','t'],
		['t','t','t','t','t','t','t'],
		['t','g','g','c','g','g','t'],
		['t','g','g','r','g','g','t'],
		['t','g','g','R','g','g','t'],
		['z','G','g','r','g','G','z']
	];
	assert.deepEqual(td.getData('t124-r3'), expected, 'Decode tile data (getData)');

	expected = [
		['z','G','g','r','g','g','z'],
		['g','g','g','R','g','g','t'],
		['g','g','g','r','g','g','t'],
		['r','R','r','c','g','g','T'],
		['g','g','g','r','g','g','t'],
		['g','g','g','R','g','g','t'],
		['z','G','g','r','g','G','z']
	];
	assert.deepEqual(td.getData('t1-r234', 1), expected, 'getData + rotate 1');

	expected = [
		['z','g','g','r','g','g','z'],
		['G','g','g','R','g','g','G'],
		['g','g','g','r','g','g','g'],
		['r','R','r','c','r','R','r'],
		['g','g','g','g','g','g','g'],
		['G','g','g','g','g','g','g'],
		['z','t','t','T','t','t','z']
	];
	assert.deepEqual(td.getData('t1-r234', 2), expected, 'getData + rotate 2');

	expected = [
		['z','G','g','r','g','G','z'],
		['t','g','g','R','g','g','g'],
		['t','g','g','r','g','g','g'],
		['T','g','g','c','r','R','r'],
		['t','g','g','r','g','g','g'],
		['t','g','g','R','g','g','g'],
		['z','g','g','r','g','G','z']
	];
	assert.deepEqual(td.getData('t1-r234', 3), expected, 'getData + rotate 3');

	data = [
		['z','g','g','r','g','g','z'],
		['g','g','g','r','g','g','t'],
		['g','g','g','r','g','g','t'],
		['r','r','r','r','g','g','t'],
		['g','g','g','g','g','g','t'],
		['g','g','g','g','g','g','t'],
		['z','g','g','g','g','g','z']
	];
	expected = 'zggrggz';
	assert.deepEqual(td.getSide(data, 0), expected, 'getSide 0');

	data = [
		['z','g','g','r','g','g','z'],
		['g','g','g','r','g','g','t'],
		['g','g','g','r','g','g','t'],
		['r','r','r','r','g','g','t'],
		['g','g','g','g','g','g','t'],
		['g','g','g','g','g','g','t'],
		['z','g','g','g','g','g','z']
	];
	expected = 'ztttttz';
	assert.deepEqual(td.getSide(data, 1), expected, 'getSide 1');

	data = [
		['z','g','g','r','g','g','z'],
		['g','g','g','r','g','g','t'],
		['g','g','g','r','g','g','t'],
		['r','r','r','r','g','g','t'],
		['g','g','g','g','g','g','t'],
		['g','g','g','g','g','g','t'],
		['z','g','g','g','g','g','z']
	];
	expected = 'zgggggz';
	assert.deepEqual(td.getSide(data, 2), expected, 'getSide 2');

	data = [
		['z','g','g','r','g','g','z'],
		['g','g','g','r','g','g','t'],
		['g','g','g','r','g','g','t'],
		['r','r','r','r','g','g','t'],
		['g','g','g','g','g','g','t'],
		['g','g','g','g','g','g','t'],
		['z','g','g','g','g','g','z']
	];
	expected = 'zggrggz';
	assert.deepEqual(td.getSide(data, 3), expected, 'getSide 3');
});