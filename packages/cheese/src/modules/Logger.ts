import { blue, greenBright, red, yellowBright } from "chalk";

export class Logger {
  /** For Info Messages  */
  static info(...args: unknown[]): void {
    console.log(blue("[INFO]: "), ...args);
  }

  /** For Error Messages */
  static error(...args: unknown[]): void {
    console.error(red("[ERROR]: "), ...args);
  }

  /** For Warning Messages */
  static warn(...args: unknown[]): void {
    console.warn(yellowBright("[WARNING]: "), ...args);
  }

  /** For Success Messages */
  static success(...args: unknown[]): void {
    console.log(greenBright("[SUCCESS]: "), ...args);
  }
}
