function initMap() {
	cssPx('#area', 'top', AreaMap.TOP + AreaMap.NAV);
	cssPx('#area', 'left', AreaMap.LEFT + AreaMap.NAV);
	cssPx('#area', 'width', AreaMap.W - AreaMap.NAV * 2);
	cssPx('#area', 'height', AreaMap.H - AreaMap.NAV * 2);
}

function initNav() {
	cssPx('.nav-up-left', 'left', AreaMap.LEFT);
	cssPx('.nav-up-left', 'top', AreaMap.TOP);
	cssPx('.nav-up-left', 'width', AreaMap.NAV);
	cssPx('.nav-up-left', 'height', AreaMap.NAV);

	cssPx('.nav-up', 'left', AreaMap.LEFT + AreaMap.NAV);
	cssPx('.nav-up', 'top', AreaMap.TOP);
	cssPx('.nav-up', 'width', AreaMap.W - AreaMap.NAV * 2);
	cssPx('.nav-up', 'height', AreaMap.NAV);

	cssPx('.nav-up-right', 'left', AreaMap.LEFT + AreaMap.W - AreaMap.NAV);
	cssPx('.nav-up-right', 'top', AreaMap.TOP);
	cssPx('.nav-up-right', 'width', AreaMap.NAV);
	cssPx('.nav-up-right', 'height', AreaMap.NAV);

	cssPx('.nav-left', 'left', AreaMap.LEFT);
	cssPx('.nav-left', 'top', AreaMap.TOP + AreaMap.NAV);
	cssPx('.nav-left', 'width', AreaMap.NAV);
	cssPx('.nav-left', 'height', AreaMap.H - AreaMap.NAV * 2);

	cssPx('.nav-right', 'left', AreaMap.LEFT + AreaMap.W - AreaMap.NAV);
	cssPx('.nav-right', 'top', AreaMap.TOP + AreaMap.NAV);
	cssPx('.nav-right', 'width', AreaMap.NAV);
	cssPx('.nav-right', 'height', AreaMap.H - AreaMap.NAV * 2);

	cssPx('.nav-down-left', 'left', AreaMap.LEFT);
	cssPx('.nav-down-left', 'top', AreaMap.TOP + AreaMap.H - AreaMap.NAV);
	cssPx('.nav-down-left', 'width', AreaMap.NAV);
	cssPx('.nav-down-left', 'height', AreaMap.NAV);

	cssPx('.nav-down', 'left', AreaMap.LEFT + AreaMap.NAV);
	cssPx('.nav-down', 'top', AreaMap.TOP + AreaMap.H - AreaMap.NAV);
	cssPx('.nav-down', 'width', AreaMap.W - AreaMap.NAV * 2);
	cssPx('.nav-down', 'height', AreaMap.NAV);

	cssPx('.nav-down-right', 'left', AreaMap.LEFT + AreaMap.W - AreaMap.NAV);
	cssPx('.nav-down-right', 'top', AreaMap.TOP + AreaMap.H - AreaMap.NAV);
	cssPx('.nav-down-right', 'width', AreaMap.NAV);
	cssPx('.nav-down-right', 'height', AreaMap.NAV);
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
		var ny = y + dy * AreaMap.SCROLL;
		if (dy > 0 && ny >= 0) {
			ny = 0;
		}
		if (dy < 0 && (y + cssPx('#map', 'height')) <= AreaMap.H) {
			ny = AreaMap.H - cssPx('#map', 'height');
		}
		cssPx('#map', 'top', ny);
	}
	if (dx) {
		var x = cssPx('#map', 'left');
		var nx = x + dx * AreaMap.SCROLL;
		if (dx > 0 && nx >= 0) {
			nx = 0;
		}
		if (dx < 0 && (x + cssPx('#map', 'width')) <= AreaMap.W) {
			nx = AreaMap.W - cssPx('#map', 'width');
		}
		cssPx('#map', 'left', nx);
	}
	if (!timer) {
		timer = setInterval(function(){
			moveMap(dy, dx);
		}, AreaMap.DELAY);
	}
}