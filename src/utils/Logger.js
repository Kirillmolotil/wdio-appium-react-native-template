const log4js = require('log4js');
const date = new Date();

log4js.configure({
    appenders: {
        API: {
            type: 'file', 
            filename: `./src/data/logs/api-logs${date}.log`,
            flags: 'w+'
        }
    },
    categories: {default: {appenders: ['API'], level: 'info'}}
});

const apiLogger = log4js.getLogger('API');

apiLogger.info(`Work with Api's is started`);

module.exports = {
    apiLogger: apiLogger
};