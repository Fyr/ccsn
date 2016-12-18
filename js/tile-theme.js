/*
	Менеджер ресурсов для тайлов. По сути задают темизацию тайлов
*/

var TileTheme = createClass({
	construct: function() {
	},

	getTile: function (tile, dir) {
		if (tile == '*') {
			return {class: 'tile'};
		}
		return {src: '/img/tiles/tile-' + tile + '.png', class: (dir > 0) ? 'tile rotate' + dir : 'tile'};
	},

	getMiple: function (type, color) {
		if (type == 'slot') {
			return {src: '/img/miple/miple-slot.png', class: 'miple-slot'};
		} else if (type == 'cursor') {
			return {src: '/img/miple/red/knight2.png', class: ''};
		} else if (type == '*') { // любой мипл
			return {class: 'miple'};
		}
		var miple_src = (type == 'G') ? 'peasant2.png' : 'knight2.png';
		return {src: '/img/miple/' + color + '/' + miple_src, class: 'miple'}
	}
});