import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';
import { Resolver } from '@stoplight/json-ref-resolver';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  private readonly config: any;
  private readonly env: any;
  private ready = false;

  constructor(private http: HttpClient, private logger: LoggerService) {
    this.config = {};
    this.env = environment;
  }

  public getConfig(key: string): any {
    return this.config[key];
  }

  public getEnv(key: string): any {
    return this.env[key];
  }

  /**
   * Indicates if config is ready.
   */
  public isReady(): boolean {
    return this.ready;
  }

  /**
   * Fetch and resolve api definitions.
   */
  async fetch() {
    try {
      const config: any = await this.http.get(this.env.config.url, { responseType: 'json' }).toPromise();
      const resolver = new Resolver();
      const refResult: any = await resolver.resolve(config);
      this.config.schemas = refResult.result.components.schemas;
      this.ready = true;
    } catch (e) {
      this.logger.error('Could not load config:', e.message);
      throw new Error('Backend not available.');
    }
  }
}
