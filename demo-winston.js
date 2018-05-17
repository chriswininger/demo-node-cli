require('dotenv').config();
const winston = require('winston');
const config = winston.config;
winston.emitErrs = true;

const transports = [
	new winston.transports.Console({
		//colorize: true,
		formatter: (opts) => {
			return `[${new Date(Date.now())}][${config.colorize(opts.level)}] ${opts.message || ''}`
			return `${Date.now()} ${config.colorize(opts.level, opts.level.toUpperCase())} ${opts.message || ''}`
		}
	}),
	new winston.transports.File({
			name: 'info-file', // need to specify custom name because we have two of this type
			level: 'info',
			filename: './info.log',
			handleExceptions: false,
			json: false,
			maxsize: 5242880,
			maxFiles: 5,
			colorize: false
	}),
	new winston.transports.File({
			name: 'error-file',
			level: 'error',
			filename: './error.log',
			handleExceptions: true,
			json: false,
			maxsize: 5242880,
			maxFiles: 5,
			colorize: false
	})
];

const logger = new winston.Logger({
	transports,
	exitOnError: false
});

logger.level = process.env.LEVEL||'warn';
logger.debug('debug, dev should see me');
logger.info('info you can see me');
logger.warn('bad monkey');
logger.error('planet of the apes level bad monkey');

