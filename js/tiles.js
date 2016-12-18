/*
Кодирование тайла:
	g - ground (трава)
	r - road (дорога), C - crossroads (перекресток, конечная точка дороги)
	t - town (город)
	m - monastery (монастырь)
	Заглавная буква - место установки мипла на соотв.территоррию
*/
var Tiles = {
	't1': [
		'ztttttz',
		'gggTggg',
		'ggggggg',
		'ggggggg',
		'gggGggg',
		'ggggggg',
		'zgggggz'
	],
	't12': [
		'zttTttz',
		'ggggggt',
		'ggggggt',
		'gGgggTt',
		'ggggggt',
		'ggggggt',
		'zgggggz'
	],
	't13': [
		'ztttttz',
		'gggTggg',
		'ggggggg',
		'gggGggg',
		'ggggggg',
		'gggTggg',
		'ztttttz'
	],
	't1-r23': [
		'ztttttz',
		'gggTggg',
		'Ggggggg',
		'gggRrrr',
		'gggrggg',
		'gggrggG',
		'zggrggz'
	],
	't1-r34': [
		'ztttttz',
		'gggTggg',
		'ggggggG',
		'rrrRggg',
		'gggrggg',
		'Gggrggg',
		'zggrggz'
	],
	't1-r234': [
		'zttTttz',
		'ggggggG',
		'ggggggg',
		'rRrcrRr',
		'gggrggg',
		'GggRggG',
		'zggrggz'
	],
	't1-r24': [ // начальный тайл
		'ztttttz',
		'gggTggg',
		'ggggggG',
		'rrrRrrr',
		'ggggggg',
		'gggGggg',
		'zgggggz'
	],
	't14': [
		'ztttttz',
		'tTggggg',
		'tgggggg',
		'tgggggg',
		'tgggGgg',
		'tgggggg',
		'zgggggz'
	],
	't14-r23': [
		'ztttttz',
		'tTggggg',
		'tgggggG',
		'tggRrrr',
		'tggrggg',
		'tggrggG',
		'zggrggz'
	],
	't24': [
		'zgggggz',
		'tggGggt',
		'tgggggt',
		'tttTttt',
		'tgggggt',
		'tggGggt',
		'zgggggz'
	],
	't124': [
		'ztttttz',
		'tttTttt',
		'ttttttt',
		'tgggggt',
		'tgggggt',
		'tggGggt',
		'zgggggz'
	],
	't124-r3': [
		'ztttttz',
		'tttTttt',
		'ttttttt',
		'tggcggt',
		'tggrggt',
		'tggRggt',
		'zGgrgGz'
	],
	't1234-s': [
		'ztttttz',
		'ttttttt',
		'ttttttt',
		'tttTttt',
		'ttttttt',
		'ttttttt',
		'ztttttz'
	],
	'm': [
		'zgggggz',
		'ggggggg',
		'ggggggg',
		'gggMggg',
		'ggggggg',
		'gggGggg',
		'zgggggz'
	],
	'm-r3': [
		'zgggggz',
		'gggGggg',
		'ggggggg',
		'gggMggg',
		'gggcggg',
		'gggRggg',
		'zggrggz'
	],
	'r13': [
		'zggrggz',
		'gggrggg',
		'gggrggg',
		'GggRggG',
		'gggrggg',
		'gggrggg',
		'zggrggz'
	],
	'r34': [
		'zgggggz',
		'gggggGg',
		'ggggggg',
		'rrrRggg',
		'gggrggg',
		'Gggrggg',
		'zggrggz'
	],
	'r234': [
		'zgggggz',
		'gggGggg',
		'ggggggg',
		'rRrcrRr',
		'gggrggg',
		'GggRggG',
		'zggrggz'
	],
	'r1234': [
		'zggrggz',
		'gGgRgGg',
		'gggrggg',
		'rRrcrRr',
		'gggrggg',
		'gGgRgGg',
		'zggrggz'
	]
};
