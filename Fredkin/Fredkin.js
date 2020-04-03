// Fredkin's Replicator - Implementation by Andrew Aaron 28-03-2020
//	>	>	>	>	>	>	> npm run fredkin	<	<	<	<	<	<	<

// Read readme.md for explanation of algorithm. 
// The program's entry point is found at the end of the file! Have fun!

// __varN__ Indicates a variable which can be adjusted. Double click to highlight.

// __var1__ Side length of display. Make odd for symmetrical display.
// You may need to adjust your console's size to accomodate the output.
// Var can be set with an argument to Node eg. 'npm run fredkin 19'

// __var2__ Step size of neighbourhood. Default "1" will sum cells right next to
// the current cell being evaluated. eg. 'npm run fredkin 19 2'	<	<	<	<	<	<

// __var3__ Time between frames in ms. eg. 'npm run fredkin 19 2 1000'	<	<	<	<

// __var4__ Number of iterations. Ctrl + C to break out anytime!

// __var5__ Toggle recursive mode. If set to true the program will run until
// the field repeats a frame (granted that the history array is big enough!).
// 'dim' >= 19 takes much longer to process than 'dim' < 19.
// The variable 'iterations' is ignored.

// The Fredkin algo checks if the sum of the surrounding cells
// of the current cell is odd. If it is odd the current cell is set 
// to 1. Set the following flags to check different directions:
// __var6__ Algo will check North East South West. 
// __var7__ Algo will check Noreast Southeast Southwest Norwest.

// __var8__ Display as simple blocks or a pretty pattern.

// __var9__ If true algo will run to minus 1 of the boundary.

// ================================================================================
// Variables setup.
// ================================================================================

var args = process.argv.slice(2);
var field = [];									// Need seperate arrays for the algo
var display = [];								// and for showing the result.
var history = [];
var history_length = 32;
var dim = 11;									// __var1__
if (args[0]) dim = parseInt(args[0]);
var step = 1;
if (args[1]) step = parseInt(args[1]);			// __var2__
var clock_in_ms = 1;	 						// __var3__
if (args[2]) clock_in_ms = parseInt(args[2]);
var iterations = 100; 							// __var4__
var count = 0;									// Which frame are we up to?
var recursive = true; 							// __var5__
var cardinal_flag = true;						// __var6__
var intercardinal_flag = true;					// __var7__
var blocks = true;								// __var8__
var bounded = false;							// __var9__

for (var x = 0; x < dim; x++) {				// Initalize the arrays.
	field[x] = [];
	display[x] = [];

	for (var y = 0; y < dim; y++) {
		field[x][y] = 0;
		display[x][y] = 0;
	}
}

for (var h = 0; h < history_length; h++) {
	history[h] = [];

	for (var x = 0; x < dim; x++) {
		history[h][x] = [];

		for (var y = 0; y < dim; y++) {
			history[h][x][y] = 0;
		}
	}
}

centre = parseInt(Math.floor(dim / 2));		// Set the centre to 1.
field[centre][centre] = 1;

// ================================================================================
// Functions definitions. 
// ================================================================================

var functions = {
	doAndDelay: function () {							// Mainline with built-in delay between outputs to the console.
		console.log(count);
		functions.show(Array.from(field));

		setTimeout(functions.fredkin, clock_in_ms);

		iterations--;
		count++;

		if (recursive) {
			if (functions.frameAlreadyHappened() || functions.isEmpty()) {
				return 0;
			} else {
				functions.addHistory();
				setTimeout(functions.doAndDelay, clock_in_ms);
			}
		} else {
			if (iterations > 0) {
				setTimeout(functions.doAndDelay, clock_in_ms);
			}
		}
	},
	fredkin: function () {								// The Fredkin Replicator algo.
		var boundary = 0;
		if (bounded) boundary = 1;
	
		for (var x = boundary; x < dim - boundary; x++) {
			for (var y = boundary; y < dim - boundary; y++) {
				var north = (y + dim - (step % dim)) % dim;
				var south = (y + (step % dim)) % dim;
				var west = (x + dim - (step % dim)) % dim;
				var east = (x + (step % dim)) % dim;
				var sum_of_neighbours = 0;

				if (cardinal_flag) sum_of_neighbours = field[x][north] + field[x][south] + field[west][y] + field[east][y];
				if (intercardinal_flag) sum_of_neighbours = sum_of_neighbours +
					field[east][north] + field[east][south] + field[west][north] + field[west][south];

				if (sum_of_neighbours % 2 == 1) display[x][y] = 1;
				else display[x][y] = 0;
			}
		}

		for (var x = 0; x < dim; x++) {
			for (var y = 0; y < dim; y++) {
				field[x][y] = display[x][y];
			}
		}
	},
	show: function (array) {							// The display function.
		var border_string = ' ';

		for (var b = 0; b < dim; b++) {
			border_string = border_string.concat('---');
		}

		border_string = border_string.concat(' ');
		console.log(border_string);

		for (var x = 0; x < dim; x++) {
			var output_string = '';

			for (var y = 0; y < dim; y++) {
				var char;

				if (blocks) {
					if (array[x][y] == 1) {
						char = ' ■ ';
					} else {
						char = '   ';
					}
				} else {
					if (array[x][y] == 1 && (x % 2 == 0 && y % 2 == 0)) {
						char = ' ■ ';
					} else if (array[x][y] == 1 && (x % 2 == 1 && y % 2 == 0)) {
						char = ' o ';
					} else if (array[x][y] == 1 && (x % 2 == 0 && y % 2 == 1)) {
						char = ' o ';
					} else if (array[x][y] == 1 && (x % 2 == 1 && y % 2 == 1)) {
						char = ' + ';
					} else {
						char = '   ';
					}
				}

				output_string = output_string.concat(char);
			}
			console.log('|' + output_string + '|');
		}

		console.log(border_string);
	},
	addHistory: function () {							// History of frames that have already happened.
		if (count >= 1 && count <= history_length) {
			for (var x = 0; x < dim; x++) {
				for (var y = 0; y < dim; y++) {
					history[count - 1][x][y] = display[x][y];
				}
			}
		}
	},
	frameAlreadyHappened: function () {					// If the current frame is detected in history return true
		var hit;										// to break the mainline.
		var target = dim * dim;

		for (var h = 0; h < history_length; h++) {
			hit = 0;

			for (var x = 0; x < dim; x++) {
				for (var y = 0; y < dim; y++) {
					if (history[h][x][y] === field[x][y]) hit++;
				}
			}

			if (hit == target) return true;
		}
	},
	isEmpty: function () {								// If the current frame is empty the algo has nowhere to
		for (var x = 0; x < dim; x++) {					// go so break the mainline.
			for (var y = 0; y < dim; y++) {
				if (field[x][y] !== 0) return false;
			}
		}

		return true;
	}
}

functions.doAndDelay();
