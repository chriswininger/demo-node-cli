﻿Demo Notes For 5/17/2018 JavaScript User Group presentation
========================
### Node On The CLI

### Main threads
* CLI UX -- It's still a UI!
	* Passing data (arguments, flags, environment)
	* Getting GUI with the CLI -- Ncurses
* Logging Best Practices
* How To Node
	* File system
	* Web service calls
	* General patterns callback/promise,async
* Distribution/Deployment
	* npm
	* snaps
* Demos

### Unix best practices
* When terminating return 0 for success for non-zero for error, `process.exit(1)`
* Use arguments for the most common inputs and flags/switches for the less common ones
* use `console.error` to output to stderr, console.time and console.trace are nice for debuggiong
* use good choices for flag (-t, --timestamp)
* provide usage info
* provide version info

### Node -- Dealing With Async
* deme-node-patterns
* 
### Do all this simply with commander.js
* the demo-commander.js file shows how we can use this

### All About Ncurses
* New Curses -- It's an API for building "GUI-like" applications for the terminal
![ncurses](assets/images/899241728.jpeg?raw=true)
* Fond memories of reading articles served up this way in the school library

```
	Since 1995, ncurses has been ported to many systems:

	It is used in almost every system based on the Linux kernel (aside from some embedded applications).
	It is used as the system curses library on OpenBSD, FreeBSD and OSX.
	It is used in environments such as Cygwin and MinGW. The first of these was EMX on OS/2 Warp.
	It is used (though usually not as the system curses) on all of the vendor unix systems, e.g., AIX, HP-UX, IRIX64, SCO, Solaris, Tru64.
	It should work readily on any ANSI/POSIX-conforming unix.
```

https://www.gnu.org/software/ncurses/
* "The first curses library was developed at the University of California at Berkeley, for a BSD operating system, around 1980 to support a screen-oriented game. It originally used the termcap library, which was used in other programs, such as the vi editor.[2]"
* Ncureses in Node
	* https://www.npmjs.com/package/blessed
	* https://www.npmjs.com/package/blessed-vue
	* https://www.npmjs.com/package/ncurses

### Logging
* Categorization (debug levels)
* Simple `debug`: 
```
const debug = require('debug');
const debugRoute1 = debug('myApp:router:route1');

debugRoute1('handlinng request');
```
* expres logging:
```
logger = require('morgan');
app.use(logger('dev'));
```

* Winston
	* Log Levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
	* You can define custom logging levels, this could get you debug style functionality
	* formatter can help you append custom info
	
```
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
```

* You can also define loggers behind categories

```
  var winston = require('winston');
 
  //
  // Configure the logger for `category1`
  //
  winston.loggers.add('category1', {
    console: {
      level: 'silly',
      colorize: true,
      label: 'category one'
    },
    file: {
      filename: '/path/to/some/file'
    }
  });
 
  //
  // Configure the logger for `category2`
  //
  winston.loggers.add('category2', {
    couchdb: {
      host: '127.0.0.1',
      port: 5984
    }
  });

 var category1 = winston.loggers.get('category1');
 
  category1.info('logging from your IoC container-based logger');
```

```
const { configure, getLogger } = require('log4js');
require('dotenv').config()

module.exports = {
    getLogger: (level) => {
        level = level || 'debug'
        configure({
            appenders: { debug: { type: 'file', filename: 'debug.log' } },
            categories: { default: { appenders: ['debug'], level: 'debug' } }
        });
        const logger = getLogger(level);
        logger.level = process.env.Level || 'OFF';

        return logger
    }
}
```
### My Apps (Full Featured Demos):
1. [Every Picture](https://github.com/chriswininger/ASCIILiveGalleryHopDemo)
2. [cli-worm](https://github.com/chriswininger/cli-worm)

#### other resources:
	* https://coralogix.com/log-analytics-blog/node-logging-best-practices-tips/
	* https://www.npmjs.com/package/winston#logging
	* http://stritti.github.io/log4js/
	* https://www.npmjs.com/package/dotenv
	* https://www.quora.com/What-are-some-of-the-best-practices-for-designing-the-UX-of-a-command-line-interface

