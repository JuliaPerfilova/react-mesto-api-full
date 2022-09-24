const winston = require('winston');
const expressWinston = require('express-winston');

function customRequestFilter(req, propName) {
  if (propName === 'headers') {
    return Object.keys(req.headers).reduce((filteredHeaders, key) => {
      if (key !== 'authorization') {
        // eslint-disable-next-line no-param-reassign
        filteredHeaders[key] = req.headers[key];
      }
      return filteredHeaders;
    }, {});
  }
  return req[propName];
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
  requestFilter: customRequestFilter,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
