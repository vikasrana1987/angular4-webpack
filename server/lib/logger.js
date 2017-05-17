'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const queries = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
	  name: 'queries',
      filename: `${logDir}/queries.log`,
      timestamp: tsFormat,
	  maxsize: 100000,
	  maxFiles: 1,
	  handleExceptions: true,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
	  name: 'general',
      filename: `${logDir}/general.log`,
      timestamp: tsFormat,
	  maxsize: 100000,
	  maxFiles: 1,
	  handleExceptions: true,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

module.exports = {queries, logger};