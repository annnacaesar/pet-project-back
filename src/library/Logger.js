const chalk = require('chalk');

class Logger {
  log = (args) => this.info(args);

  info = (args) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO] `),
      typeof args === 'string' ? chalk.blueBright(args) : args
    );

  warn = (args) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `),
      typeof args === 'string' ? chalk.yellowBright(args) : args
    );

  error = (args) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [ERROR] `),
      typeof args === 'string' ? chalk.redBright(args) : args
    );
}

module.exports = new Logger();
