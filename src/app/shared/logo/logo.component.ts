import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'arpa-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {

  arpaUrl: string;

  constructor(private configService: ConfigService) {
    this.arpaUrl = configService.getEnv('arpa').url;
  }

  ngOnInit(): void {
  }

}
