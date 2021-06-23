import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ILoggerService {
  info(value: any, ...rest: any[]): void;

  log(value: any, ...rest: any[]): void;

  warn(value: any, ...rest: any[]): void;

  error(value: any, ...rest: any[]): void;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILoggerService {

  info(value: any, ...rest: any[]): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.info(value, rest);
    }
  }

  log(value: any, ...rest: any[]): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.log(value, rest);
    }
  }

  warn(value: any, ...rest: any[]): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.warn(value, rest);
    }
  }

  error(value: any, ...rest: any[]): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.error(value, rest);
    }
  }
}
