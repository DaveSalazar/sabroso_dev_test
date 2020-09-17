import { createLogger, format, transports } from "winston";
import moment from 'moment';

export default createLogger({
  format: format.combine(
    format.simple(), 
    format.timestamp(),
    format.printf(info => 
      `[${moment(info.timestamp, "YYYY-MM-DD HH:mm")}] ${info.level} ${info.message}`
      )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../../logs/sabroso-api.log`
    }),
    new transports.Console({
      level: "debug",     
    })
  ]
});
