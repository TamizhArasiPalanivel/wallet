import winston from 'winston';
import appRoot  from 'app-root-path';
import 'winston-daily-rotate-file';
import winstonElasticSearch from 'winston-elasticsearch';
import loggerConfig from '../config/loggerConfig.json' assert { type: 'json' };

/**
 * System logging levels applicable along with priority 
 *       emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7
 *       http requests are logged at debug level.
 * The logs will be printed for level defined in .env and levels above that
 */

 export default class SystemLogger {
    constructor() {
        this.loggerConfig = loggerConfig.logger_config;
        this.timeformat = this.loggerConfig.winston.timeformat;
        this.emergencyLogger = null;
        this.alertLogger = null;
        this.criticalLogger = null;
        this.errorLogger = null;
        this.warnLogger = null;
        this.noticeLogger = null;
        this.infoLogger = null;
        this.debugLogger = null;
        this.emergencyLogInit();
        this.alertLogInit();
        this.criticalLogInit();
        this.errorLogInit();
        this.warnLogInit();
        this.noticeLogInit();
        this.infoLogInit();
        this.debugLogInit();
    }

    emergencyLogInit() {
        this.emergencyLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('emerg')
        })
    }
    alertLogInit() {
        this.alertLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('alert')
        })
    }
    criticalLogInit() {
        this.criticalLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('crit')
        })
    }
    errorLogInit() {
        this.errorLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('error')
        })
    }
    warnLogInit() {
        this.warnLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('warning')
        })
    }
    noticeLogInit() {
        this.noticeLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('notice')
        })
    }
    infoLogInit() {
        this.infoLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('info')
        })
    }
    debugLogInit() {
        this.debugLogger = new winston.createLogger({
            level: process.env.LOG_LEVEL,
            levels: winston.config.syslog.levels,
            transports: getLogsTransport('debug')
        })
    }

    emergency(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.emergencyLogger.log('emerg', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }

    }
    alert(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.alertLogger.log('alert', message, metadata);
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    critical(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.criticalLogger.log('crit', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    error(message, metadata) {
        try {
            console.log(message, metadata);
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.errorLogger.log('error', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    warn(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.warnLogger.log('warning', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    notice(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.noticeLogger.log('notice', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    info(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.infoLogger.log('info', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    debug(message, metadata) {
        try {
            if (typeof message == "object") {
                message = JSON.stringify(message)
            }
            this.debugLogger.log('debug', message, metadata);            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
    http(message, metadata) {
        try {
            if (loggerConfig.winston.http) {
                if (typeof message == "object") {
                    message = JSON.stringify(message)
                }
                this.debugLogger.log('debug', message, metadata);
            }            
        } catch (error) {
            console.log("error in loggers", error)
        }
    }
}

/**
 * Util function to return the transports based on configurations in .env and logger config
 */
function getLogsTransport(level) {
    try {
        let transport = [];
        const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata}) => {
            message = typeof message == "object" ? JSON.stringify(message) : message;
            let data = null;
            if (metadata) {
                if (typeof metadata == 'string') {
                    data = metadata != "" ? metadata : "-";
                } else if (typeof metadata == 'object') {
                    data = JSON.stringify(metadata) != "{}" ? JSON.stringify(metadata) : "-";
                }
            }
            return `[${level}] - ${timestamp} - message: ${message} - metadata: ${data}`;
        });
        if (process.env.ENABLE_FILE_LOGS == "true") {
            transport.push(new winston.transports.DailyRotateFile({
                filename: `${appRoot}/logs/${level}/${level}-%DATE%.log`,
                datePattern: 'YYYY-MM-DD-HH',
                maxSize: '20m',
                maxFiles: '14d',
                level: level,
                format: winston.format.combine(
                    winston.format.timestamp(),
                    logFormat
                )
            }))
        }
        if (process.env.ENABLE_ELK_LOGS == "true" && loggerConfig.logger_config.winston[level]) {
            const elkLogOptions = {
                level: level,
                indexPrefix: process.env.ELK_INDEX_NAME,
                clientOpts: {
                    node: process.env.ELK_URL,
                    auth: {
                        username: process.env.ELK_USERNAME,
                        password: process.env.ELK_PASSWORD
                    }
                },
                flushInterval: parseInt(process.env["ELK_FLUSH_INTERVAL"]),
            }
            const elk = new winstonElasticSearch.ElasticsearchTransport(elkLogOptions);
            transport.push(elk)
        }
        if (process.env.ENABLE_CONSOLE_LOGS == "true") {
            transport.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    logFormat
                ),
            }))
        }
        return transport;
    } catch (error) {
        console.log(error);
    }
}
