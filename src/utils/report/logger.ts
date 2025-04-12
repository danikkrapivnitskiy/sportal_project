import { AllureRuntime, ContentType } from 'allure-js-commons';
import fs from 'fs-extra';
import path from 'path';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private static instance: Logger;
  private runtime: AllureRuntime;
  private logDir: string;

  private constructor() {
    this.runtime = new AllureRuntime({ resultsDir: './allure-results' });
    this.logDir = path.resolve(process.cwd(), 'logs');
    this.ensureLogDirExists();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private ensureLogDirExists(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  private writeToFile(message: string): void {
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, `test-${date}.log`);
    fs.appendFileSync(logFile, message + '\n');
  }

  public log(level: LogLevel, message: string, attachToAllure = true): void {
    const formattedMessage = this.formatMessage(level, message);
    
    // Write to console
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
    }
    
    // Write to file
    this.writeToFile(formattedMessage);
    
    // Attach to Allure
    if (attachToAllure) {
      this.runtime.writeAttachment(
        formattedMessage,
        ContentType.TEXT,
        `.log-${level.toLowerCase()}`
      );
    }
  }

  public debug(message: string, attachToAllure = false): void {
    this.log(LogLevel.DEBUG, message, attachToAllure);
  }

  public info(message: string, attachToAllure = true): void {
    this.log(LogLevel.INFO, message, attachToAllure);
  }

  public warn(message: string, attachToAllure = true): void {
    this.log(LogLevel.WARN, message, attachToAllure);
  }

  public error(message: string, attachToAllure = true): void {
    this.log(LogLevel.ERROR, message, attachToAllure);
  }

  public step(stepName: string, fn: () => Promise<any> | any): Promise<any> | any {
    this.info(`Starting step: ${stepName}`);
    try {
      const result = fn();
      if (result instanceof Promise) {
        return result.then((value) => {
          this.info(`Completed step: ${stepName}`);
          return value;
        }).catch((err) => {
          const errorMessage = err instanceof Error ? err.message : String(err);
          this.error(`Failed step: ${stepName}. Error: ${errorMessage}`);
          throw err;
        });
      } else {
        this.info(`Completed step: ${stepName}`);
        return result;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.error(`Failed step: ${stepName}. Error: ${errorMessage}`);
      throw err;
    }
  }
}

export const logger = Logger.getInstance(); 