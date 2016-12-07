function cssPx(e, prop, val) {
	// console.log(e, prop, val);
	var px = parseInt($(e).css(prop).replace(/px/, ''));
	if (typeof(val) != 'undefined') {
		$(e).css(prop, val + 'px');
	}
	return px;
}

function initMap() {
	cssPx('#area', 'top', MAP.TOP);
	cssPx('#area', 'left', MAP.LEFT);
	cssPx('#area', 'width', MAP.W);
	cssPx('#area', 'height', MAP.H);
}

function initNav() {
	cssPx('.nav-up', 'left', MAP.LEFT);
	cssPx('.nav-up', 'width', MAP.W);
	cssPx('.nav-down', 'left', MAP.LEFT);
	cssPx('.nav-down', 'top', MAP.TOP + MAP.H);
	cssPx('.nav-down', 'width', MAP.W);

	cssPx('.nav-left', 'top', MAP.TOP);
	cssPx('.nav-left', 'left', MAP.TOP - MAP.NAV);
	cssPx('.nav-left', 'height', MAP.H);

	cssPx('.nav-right', 'top', MAP.TOP);
	cssPx('.nav-right', 'left', MAP.LEFT + MAP.W);
	cssPx('.nav-right', 'height', MAP.H);

	cssPx('.nav-up-right', 'left', MAP.LEFT + MAP.W);
	cssPx('.nav-down-left', 'left', MAP.TOP - MAP.NAV);
	cssPx('.nav-down-left', 'top', MAP.TOP + MAP.H);
	cssPx('.nav-down-right', 'left', MAP.LEFT + MAP.W);
	cssPx('.nav-down-right', 'top', MAP.TOP + MAP.H);
}

function initNavEvents() {
	$('.nav').mouseleave(function(){
		clearInterval(timer);
		timer = null;
	});
	$('.nav-up').mouseenter(function(){
		moveMap(1, 0);
	});
	$('.nav-down').mouseenter(function(){
		moveMap(-1, 0);
	});
	$('.nav-left').mouseenter(function(){
		moveMap(0, 1);
	});
	$('.nav-right').mouseenter(function(){
		moveMap(0, -1);
	});
	$('.nav-up-left').mouseenter(function(){
		moveMap(1, 1);
	});
	$('.nav-up-right').mouseenter(function(){
		moveMap(1, -1);
	});

	$('.nav-down-left').mouseenter(function(){
		moveMap(-1, 1);
	});
	$('.nav-down-right').mouseenter(function(){
		moveMap(-1, -1);
	});
}

function moveMap(dy, dx) {
	if (dy) {
		var y = cssPx('#map', 'top');
		var ny = y + dy * MAP.SCROLL;
		if (dy > 0 && ny >= 0) {
			ny = 0;
		}
		if (dy < 0 && (y + cssPx('#map', 'height')) <= MAP.H) {
			ny = MAP.H - cssPx('#map', 'height');
		}
		cssPx('#map', 'top', ny);
	}
	if (dx) {
		var x = cssPx('#map', 'left');
		var nx = x + dx * MAP.SCROLL;
		if (dx > 0 && nx >= 0) {
			nx = 0;
		}
		if (dx < 0 && (x + cssPx('#map', 'width')) <= MAP.W) {
			nx = MAP.W - cssPx('#map', 'width');
		}
		cssPx('#map', 'left', nx);
	}
	if (!timer) {
		timer = setInterval(function(){
			moveMap(dy, dx);
		}, MAP.DELAY);
	}
}