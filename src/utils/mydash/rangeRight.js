function rangeRight(start, end, step) {
		return range(start, end, step, true);
}

function range(start, end, step, isRight) {
    let flag = false;
	if (typeof start === "undefined") {
		start = 1;
	}
	if (typeof end === "undefined") {
		end = start;
		start = 0;
	}
	if (step === 0) {
		flag = true;
	}
	if (typeof step === "undefined" || step === 0) {
		step = 1;
	}
	if (Math.sign(end) === -1) {
		if (Math.sign(step) !== -1) {
			step = -step;
		}

	}
	let arr = [];

	function compare(i, end) {
		if (Math.sign(end) === -1) {
			return i > end;
		} else {
			return i < end;
		}
	}

	for (let i = start, index = 0; compare(i, end); i += step, index++) {
		if (flag) {
			arr[index] = start;
		} else {
			arr[index] = i;
		}

	}
	if (isRight) {return arr.reverse()}
	return arr;
}

rangeRight(4); // => [3, 2, 1, 0]
rangeRight(-4); // => [-3, -2, -1, 0]
rangeRight(1, 5); // => [4, 3, 2, 1]
rangeRight(0, 20, 5); // => [15, 10, 5, 0]
rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
rangeRight(1, 4, 0); // => [1, 1, 1]
rangeRight(0); // => []