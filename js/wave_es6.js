class Wave {
	constructor (aWaveMap, x, y) {
		this.aWaveMap = aWaveMap;
		this.x = x;
		this.y = y;

		this.stepCost = 1;
	}

	getWaveMap() {
		return this.aWaveMap;
	}

	availPoints() {
		// здесь будут различия в проверке потенциальных точек - 4, 6, 8
		return [
			{dx: 0, dy: -1},
			{dx: 1, dy: 0},
			{dx: 0, dy: 1},
			{dx: -1, dy: 0}
		];
	}

	checkPos(newX, newY) {
		return newX > 0 && newY > 0 && newX < this.aWaveMap[0].length && newY < this.aWaveMap.length;
	}

	process() {
		let dNext = this.availPoints();
		/*
		for (const e of dNext) {
			if (this.checkPos(this.x + e.dx, this.y + e.dy)) {
				this.aWaveMap[this.x + e.dx][this.y + e.dy] += this.stepCost;
			}
		};
		*/
		/*
		dNext.forEach(function(e) {
			if (this.checkPos(this.x + e.dx, this.y + e.dy)) {
				this.aWaveMap[this.x + e.dx][this.y + e.dy] = this.stepCost;
			}
		});
		*/
	}


}

