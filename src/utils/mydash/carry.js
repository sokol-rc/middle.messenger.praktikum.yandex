
function curry(f) {
	return function(a) {
		return function(b) {
			return f(a, b);
		}
	}
}

function sum(a, b) {
	return a + b;
}

const currySum = curry(sum);
const sumTwo = currySum(2);

console.log(sumTwo(5))