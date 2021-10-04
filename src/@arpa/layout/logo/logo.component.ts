import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'arpa-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {

  arpaUrl: string;

  constructor(private configService: ConfigService) {
    this.arpaUrl = configService.getEnv('arpa').url;
  }
}
