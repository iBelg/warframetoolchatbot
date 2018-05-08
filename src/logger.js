import winston from 'winston';

export default class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console({
                    format: winston.format.simple()
                })
            ]
        });
    }

    info(msg) {
        this.logger.info(msg)
    }
}