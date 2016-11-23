/*
Структура тайла:
<название PNG> : {
	roads: [
		описание матрицы 5x5 соотв-щее оригинальному PNG, где
		0 - трава,
		1 - дорога
		2 - конечная точка дороги (идет в зачет)
		3 - незаконченый город
		4 - стена города
		(5 - монастырь - не нужен, проверяем отдельно)
	]
	monastery: bool (есть/нету)
	count: int (кол-во в тайл-сете)
	rotatable: можно ли вращать (напр. монастырь - нельзя, а город t1234 нет смысла)
}

Проверка на совмещение должна происходить по 3м точкам каждой из сторон тайла
*/

var G = 0;
var R = 1;
var E = 2;
var T = 3;
var W = 4;

var TILES = {
	GROUND: 'G', ROAD: 'R', CROSSROAD: 'C', TOWN: 'T', MONASTERY: 'M', Z_POINT: 'Z',
	't1-r24': { // начальный тайл
		route: [
			[0, 4, 4, 4, 0],
			[0, 0, 0, 0, 0],
			[1, 1, 1, 1, 1],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		],
	},
	'r13': {
		roads: [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
	},
	'r34': {
		roads: [[0, 0, 0], [1, 1, 0], [0, 1, 0]],
	},
	'r234': {
		roads: [[0, 0, 0], [1, 2, 1], [0, 1, 0]],
	},
	'r1234': {
		roads:  [[0, 1, 0], [1, 2, 1], [0, 1, 0]],
	}
};