QUnit.test("TileSet tests", function (assert) {
	var ts = new TileSet(null, null, new TileData(TILES));
	data = [
		['r34',  '',       'r13'],
		['r23',  't1-r24', 'r34'],
		['',     '',       'r13'],
	];
	ts.setTiles(data);
	ts.extendData();
	expected = [
		['',     '',     '',       '',    ''],
		['',     'r34',  '',       'r13', ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       'r13', ''],
		['',     '',     '',       '',    '']
	];
	assert.deepEqual(ts.getTiles(), expected, 'Extend all');


	data = [
		['',     '',       '',     ''],
		['',     't1-r24', 'r34',  ''],
		['',     '',       '',     '']
	];
	ts.setTiles(data);
	ts.revealSlots();
	expected = [
		['',     'slot',   'slot', ''    ],
		['slot', 't1-r24', 'r34',  'slot'],
		['',     'slot',   'slot', ''    ]
	];
	assert.deepEqual(ts.getTiles(), expected, 'Reveal slots - 2 tiles only');

	data = [
		['',     '',     '',       '',    '',    '',     '',     '',      '',     '',    ''],
		['',     '',     'r13',    'r13', '',    '',     '',     'r13',   'r13',  'r13', ''],
		['',     'r13',  'r13',    'r13', 'r13', 'r13',  'r13',  'r13',   'r13',  '',    ''],
		['',     'r13',  'r13',    'r13', '',    '',     'r13',  'r13',   '',     'r13', ''],
		['',     'r13',  '',       'r13', '',    '',     'r13',  'r13',   'r13',  'r13', ''],
		['',     'r13',  '',       'r13', '',    '',     'r13',  '',      'r13',  '',    ''],
		['',     'r13',  '',       'r13', 'r13', 'r13',  'r13',  '',      '',     '',    ''],
		['',     'r13',  'r13',    'r13', '',    '',     '',     '',      '',     '',    ''],
		['',     '',     '',       '',    '',    '',     '',     '',      '',     '',    '']
	];
	ts.setTiles(data);
	ts.revealSlots();
	expected = [
		['',      '',     'slot',   'slot','',      '',     '',     'slot',  'slot', 'slot', ''],
		['',      'slot', 'r13',    'r13', 'slot',  'slot', 'slot', 'r13',   'r13',  'r13', 'slot'],
		['slot',  'r13',  'r13',    'r13', 'r13',   'r13',  'r13',  'r13',   'r13',  'slot',''],
		['slot',  'r13',  'r13',    'r13', 'slot',  'slot', 'r13',  'r13',   'slot', 'r13', 'slot'],
		['slot',  'r13',  'slot',   'r13', 'slot',  'slot', 'r13',  'r13',   'r13',  'r13', 'slot'],
		['slot',  'r13',  'slot',   'r13', 'slot',  'slot', 'r13',  'slot',  'r13',  'slot',''],
		['slot',  'r13',  'slot',   'r13', 'r13',   'r13',  'r13',  'slot',  'slot', '',    ''],
		['slot',  'r13',  'r13',    'r13', 'slot',  'slot', 'slot', '',      '',     '',    ''],
		['',      'slot', 'slot',   'slot','',      '',     '',     '',      '',     '',    '']
	];
	assert.deepEqual(ts.getTiles(), expected, 'Reveal slots - complex case');

	data = [
		['',     '',       '',     ''],
		['',     't1-r24', 'r34',  ''],
		['',     '',       '',     '']
	];
	ts.setTiles(data);
	ts.setActiveTile('r34');
	ts.calcActiveSlots();
	expected = [
		['',     '',          '',     ''],
		['',     't1-r24', 'r34',     ''],
		['',     'slot',      '',     '']
	];
	assert.deepEqual(ts.getTiles(), expected, 'Create active slot - road match ground');

	data = [
		['',     '',       '',     ''],
		['',     't1-r24', 'r34',  ''],
		['',     '',       '',     '']
	];
	ts.setTiles(data);
	ts.setActiveTile('r34|2');
	ts.calcActiveSlots();
	expected = [
		['',     '',      'slot',     ''],
		['slot', 't1-r24', 'r34', 'slot'],
		['',     '',      'slot',     '']
	];
	assert.deepEqual(ts.getTiles(), expected, 'Create active slot - rotated road match road');

	data = [
		['',     '',       '',     ''],
		['',     't1-r24', 'r34',  ''],
		['',     '',       '',     '']
	];
	ts.setTiles(data);
	ts.setActiveTile('t1-r234|2');
	ts.calcActiveSlots();
	expected = [
		['',       'slot',    '',     ''],
		['slot', 't1-r24', 'r34',     ''],
		['',     '',      'slot',     '']
	];
	assert.deepEqual(ts.getTiles(), expected, 'Create active slot - rotated town+crossroad match town and road');

/*
	TODO: продумать тесты для выявления курсоров
	1. Тест на продолжение дороги (дорога/дорога)
	2. Тест на соединение земель (земля/земля)
	3. Тест на соседние тайлы (с запретом на курсор)
	4. Тест на позицию между тайлами

	data = [
		['',       'slot',   '',       ''],
		['slot',   'r13',    'slot',   ''],
		['slot',   'r13',    'r13',    'slot'],
		['',       'slot',   'slot',   '']
	];
	expected = [
		['',       'cursor', '',       ''],
		['cursor', 'r13',    'cursor', ''],
		['cursor', 'r13',    'r13',    'cursor'],
		['',       'cursor', 'cursor', '']
	];
	ts.setTiles();
	ts.revealAvailableSlots('r13');
	assert.deepEqual(ts.getTiles(), expected, 'Check available slots - road 13 - multiple road/road ground/ground');

	data = [
		['',       'slot',   '',       ''],
		['slot',   'r13',    'slot',   ''],
		['slot',   'slot',   'slot',   ''],
		['slot',   'r13',    '',   'r1234'],
		['',       'slot',   'slot',   '']
	];
	expected = [
		['',       'cursor', '',       ''],
		['cursor', 'r13',    'cursor', ''],
		['cursor', 'r13',    'r13',    'cursor'],
		['',       'cursor', 'cursor', '']
	];
	ts.setTiles();
	ts.revealAvailableSlots('r13');
	assert.deepEqual(ts.getTiles(), expected, 'Check available slots - road 13 - multiple road/road ground/ground town/slot');
	*/
});