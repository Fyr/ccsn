var TILES = {
	't1-r24': {
		roads: [
			{
				route: [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
				score: 1,
				after: 1
			}
		],
		towns: [
			{
				route: [[0, 2, 0], [0, 0, 0], [0, 0, 0]],
				score: 2,
				after: 1
			}
		],
		count: 3
	},
	'r13': {
		roads: [
			{
				route: [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
				score: 1,
				after: 1
			}
		],
		count: 8
	},
	'r34': {
		roads: [
			{
				route: [[0, 0, 0], [1, 1, 0], [0, 1, 0]],
				score: 1,
				after: 1
			}
		],
		count: 8
	},
	'r234': {
		roads: [
			{
				route: [[0, 0, 0], [1, 2, 1], [0, 1, 0]],
				score: 1,
				after: 1
			}
		],
		count: 4
	},
	'r1234': {
		roads: [
			{
				route: [[0, 1, 0], [1, 2, 1], [0, 1, 0]],
				score: 1,
				after: 1
			}
		],
		count: 1
	}
};