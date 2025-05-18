import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`
});
