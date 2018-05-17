const blessed = require('blessed');

const screen = blessed.screen({
	smartCSR: true
});

screen.title = 'Real Demo';

const box = blessed.box({
	top: 'center',
	left: 'center',
	width: '50%',
	height: '50%',
	content: 'yo man',
	border: {
		type: 'line'
	},
 	style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  },
	draggable: true
});

// !!! DONT FORGET
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.append(box);

screen.render();

