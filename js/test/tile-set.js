QUnit.test("TileSet tests", function (assert) {
	var ts = new TileSet();
	var expected = null;

	expected = [
		['',     'slot',   ''    ],
		['slot', 't1-r24', 'slot'],
		['',     'slot',   ''    ]
	];
	assert.deepEqual(ts.getData(), expected, 'Initial map state');

	data = [
		['',     '',       ''    ],
		['',     't1-r24', 'r34' ],
		['',     '',       ''    ]
	];
	ts.setData(data);
	ts.extendData();
	expected = [
		['',     '',       '',    ''],
		['',     't1-r24', 'r34', ''],
		['',     '',       '',    '']
	];
	assert.deepEqual(ts.getData(), expected, 'Extend data right');

	data = [
		['',     '',       '',    ''],
		['r23',  't1-r24', 'r34', ''],
		['',     '',       '',    '']
	];
	ts.setData(data);
	ts.extendData();
	expected = [
		['',     '',     '',       '',    ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       '',    '']
	];
	assert.deepEqual(ts.getData(), expected, 'Extend data left');

	data = [
		['',     'r34',  '',       '',    ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       '',    '']
	];
	ts.setData(data);
	ts.extendData();
	expected = [
		['',     '',     '',       '',    ''],
		['',     'r34',  '',       '',    ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       '',    '']
	];
	assert.deepEqual(ts.getData(), expected, 'Extend data top');

	data = [
		['',     '',     '',       '',    ''],
		['',     'r34',  '',       '',    ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       'r13', '']
	];
	ts.setData(data);
	ts.extendData();
	expected = [
		['',     '',     '',       '',    ''],
		['',     'r34',  '',       '',    ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       'r13', ''],
		['',     '',     '',       '',    '']
	];
	assert.deepEqual(ts.getData(), expected, 'Extend data bottom');

	data = [
		['',     '',     '',       '',    ''],
		['',     'r34',  't1',     'r13', ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       'r13', ''],
		['',     '',     '',       '',    '']
	];
	ts.setData(data);
	ts.extendData();
	expected = [
		['',     '',     '',       '',    ''],
		['',     'r34',  't1',     'r13', ''],
		['',     'r23',  't1-r24', 'r34', ''],
		['',     '',     '',       'r13', ''],
		['',     '',     '',       '',    '']
	];
	assert.deepEqual(ts.getData(), expected, 'No extend');

	data = [
		['',     '',       '',     ''],
		['',     't1-r24', 'r34',  ''],
		['',     '',       '',     '']
	];
	ts.setData(data);
	ts.revealSlots();
	expected = [
		['',     'slot',   'slot', ''    ],
		['slot', 't1-r24', 'r34',  'slot'],
		['',     'slot',   'slot', ''    ]
	];
	assert.deepEqual(ts.getData(), expected, 'Reveal slots - 2 tiles only');

	data = [
		['',     '',     '',       '',    '',    ''],
		['',     '',     'r13',    'r13', '',    ''],
		['',     'r13',  'r13',    'r13', '',    ''],
		['',     '',     'r13',    'r13', 'r13', ''],
		['',     '',     'r13',    'r13', 'r13', ''],
		['',     '',     '',       'r13', '',    ''],
		['',     '',     '',       'r13', '',    ''],
		['',     '',     '',       '',    '',    '']
	];
	ts.setData(data);
	ts.revealSlots();
	expected = [
		['',     '',     'slot',   'slot','',     ''],
		['',     'slot', 'r13',    'r13', 'slot', ''],
		['slot', 'r13',  'r13',    'r13', 'slot', ''],
		['',     'slot', 'r13',    'r13', 'r13',  'slot'],
		['',     'slot', 'r13',    'r13', 'r13',  'slot'],
		['',     '',     'slot',   'r13', 'slot', ''],
		['',     '',     'slot',   'r13', 'slot', ''],
		['',     '',     '',       'slot','',     '']
	];
	assert.deepEqual(ts.getData(), expected, 'Reveal slots - perimeter');

	data = [
		['',     '',     '',       '',    '',    '',     '',     '',      '',     '',    ''],
		['',     '',     'r13',    'r13', '',    '',     '',     'r13',   'r13',  'r13', ''],
		['',     'r13',  'r13',    'r13', 'r13', 'r13',  'r13',  'r13',   'r13',  '',    ''],
		['',     '',     'r13',    'r13', '',    '',     'r13',  'r13',   'r13',  'r13', ''],
		['',     '',     '',       'r13', '',    '',     '',     'r13',   'r13',  'r13', ''],
		['',     '',     '',       'r13', 'r13', '',     '',     '',      'r13',  '',    ''],
		['',     'r13',  '',       'r13', 'r13', '',     '',     '',      '',     '',    ''],
		['',     'r13',  'r13',    'r13', '',    '',     '',     '',      '',     '',    ''],
		['',     '',     '',       '',    '',    '',     '',     '',      '',     '',    '']
	];
	ts.setData(data);
	ts.revealSlots();
	expected = [
		['',     '',     'slot',   'slot', '',    '',     '',     'slot',  'slot', 'slot',''],
		['',     'slot', 'r13',    'r13', 'slot', 'slot', 'slot', 'r13',   'r13',  'r13', 'slot'],
		['slot', 'r13',  'r13',    'r13', 'r13',  'r13',  'r13',  'r13',   'r13',  'slot',''],
		['',     'slot', 'r13',    'r13', 'slot', 'slot', 'r13',  'r13',   'r13',  'r13', 'slot'],
		['',     '',     'slot',   'r13', 'slot', '',     'slot', 'r13',   'r13',  'r13', 'slot'],
		['',     'slot', 'slot',   'r13', 'r13',  'slot', '',     'slot',  'r13',  'slot',''],
		['slot', 'r13',  'slot',   'r13', 'r13',  'slot', '',     '',      'slot', '',    ''],
		['slot', 'r13',  'r13',    'r13', 'slot', '',     '',     '',      '',     '',    ''],
		['',     'slot', 'slot',   'slot','',     '',     '',     '',      '',     '',    '']
	];
	assert.deepEqual(ts.getData(), expected, 'Reveal slots - slot coverage & neck');

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
	ts.setData(data);
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
	assert.deepEqual(ts.getData(), expected, 'Reveal slots - slot coverage & ring');

	data = [
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
	ts.setData(data);
	ts.clearSlots();
	expected = [
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
	assert.deepEqual(ts.getData(), expected, 'Clear slots');


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
	ts.setData();
	ts.revealAvailableSlots('r13');
	assert.deepEqual(ts.getData(), expected, 'Check available slots - road 13 - multiple road/road ground/ground');

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
	ts.setData();
	ts.revealAvailableSlots('r13');
	assert.deepEqual(ts.getData(), expected, 'Check available slots - road 13 - multiple road/road ground/ground town/slot');
	*/
});