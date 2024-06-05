import winston from 'winston';

const {
  combine, timestamp, simple,
} = winston.format;

const logger = winston.createLogger({
  level: 'http',
  defaultMeta: { service: 'casalink-api' },
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/access.log', level: 'http' }),
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
