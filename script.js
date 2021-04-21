let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
	if (isNaN(value)) {
		// this is not a number
		handleSymbol(value);
	} else {
		//This is  a number
		handleNumber(value);
	}
	screen.innerText = buffer;
}

// Symbol
function handleSymbol(symbol) {
	switch (symbol) {
		case 'C':
			buffer = '0';
			runningTotal = 0;
			break;
		case '=':
			if (previousOperator === null) {
				// need you two numbers to do math
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = runningTotal;
			runningTotal = 0;
			break;
		case '⇦':
			if (buffer.length === 1) {
				buffer = '0';
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
		case '+':
		case '−':
		case '×':
		case '÷':
			handleMath(symbol);
			break;
	}
}



function handleMath(symbol) {
	if (buffer === '0') {
		//do nothing
		return;
	}
	const intBuffer = parseInt(buffer); // turn a string into a number

	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperator = symbol;
	buffer = '0';
}

function flushOperation(intBuffer) {
	if (previousOperator === '+') {
		runningTotal += intBuffer;
	} else if (previousOperator === '−') {
		runningTotal -= intBuffer;
	} else if (previousOperator === '×') {
		runningTotal *= intBuffer;
	} else {
		runningTotal /= intBuffer;
	}
}


//  Numbers
function handleNumber(numberString) {
	if (buffer === '0') {
		buffer = numberString;
	} else {
		buffer = buffer + numberString;
	}

}

//Call
function init() {
	document.querySelector('.calc-buttons')
		.addEventListener('click', function (event) {
			buttonClick(event.target.innerText);
		})
}

init();
