import winston from 'winston';
import path from 'path';

const logDirectory = path.join('/tmp', 'logs');

const {
  combine, timestamp, simple,
} = winston.format;

const logger = winston.createLogger({
  level: 'http',
  defaultMeta: { service: 'casalink-api' },
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'access.log'), level: 'http' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      timestamp(),
      simple(),
    ),
  }));
}

export default logger;
