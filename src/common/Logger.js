export const LOG_LEVELS = {
  DEBUG: 4,
  INFO: 3,
  WARN: 2,
  ERROR: 1,
  OFF: 0
};

export default class Logger {
  static logLevel = LOG_LEVELS.OFF;

  static log(...args) {
    if (this.logLevel >= LOG_LEVELS.DEBUG) {
      console.log(...args); // eslint-disable-line no-console
    }
  }

  static info(...args) {
    if (this.logLevel >= LOG_LEVELS.INFO) {
      console.info(...args); // eslint-disable-line no-console
    }
  }

  static warn(...args) {
    if (this.logLevel >= LOG_LEVELS.WARN) {
      console.warn(...args); // eslint-disable-line no-console
    }
  }

  static error(...args) {
    if (this.logLevel >= LOG_LEVELS.ERROR) {
      console.error(...args); // eslint-disable-line no-console
    }
  }

  set logLevel(level) {
    this.logLevel = level;
  }

  get logLevel() {
    return this.logLevel;
  }
}
