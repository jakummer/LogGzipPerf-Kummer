import Log4js from "log4js";


Log4js.configure({
appenders:{
console: {type: 'console'},
errorFile: {type: 'file', filename: './logs/errors.log'},
warnFile: {type: 'file', filename: './logs/warns.log'},

loggerError: {appender: 'errorFile', type: 'logLevelFilter', level:'error'},
loggerWarn: {appender: 'warnFile', type: 'logLevelFilter', level: 'warn'},
loggerConsole: {appender: 'console', type: 'logLevelFilter', level: 'info'}

},

categories:{
default:{
    appenders: ['loggerError', 'loggerWarn', 'loggerConsole'],
    level:'all'
},

},

});

const logger = Log4js.getLogger();
export default logger;