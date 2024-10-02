const winston = require('winston');
const path = require('path');

const logsDir = path.resolve('src/logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, 'site.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
  ],
});

module.exports = logger;
