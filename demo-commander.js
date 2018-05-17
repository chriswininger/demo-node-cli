const program = require('commander');

const list = [
  'item 1',
  'item 2',
  'item 3',
  'item 4'
];
const timeStamp = () => program.timestamps ? Date.now() + ' -- ' : '';


program
	.version('0.0.1', '-v, --version')
	.option('-t, --timestamps', 'include time stamps')
	.usage('[options] <command>');

program
	.command('list')
	.description('print the list')
	.action((env, options) => {
		runList();
	});

program
	.command('item <i>')
	.usage('<i>')
	.description('print the item at i from the list')
	.option('-i, --index', 'include index')
	.action(runPrintI)

program
	.parse(process.argv);


function runList() {
	list.forEach(i => console.log(`${timeStamp()}${i}`));
	process.exit(0);
}

function runPrintI (i, options) {
	const getIndex = () => options.index ? `(${i})` : '';
	console.log(`${timeStamp()}${getIndex()}${list[i]}`);
	process.exit(0);
}

console.warn('unknown command');
process.exit(1);

