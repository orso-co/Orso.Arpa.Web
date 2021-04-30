import { Component, OnInit } from '@angular/core';
import { MuproService } from '../services/mupro.service';

@Component({
  selector: 'arpa-mupro-profiles',
  templateUrl: './mupro-profiles.component.html',
  styleUrls: ['./mupro-profiles.component.scss'],
})
export class MuproProfilesComponent implements OnInit {

  public user;

  constructor(private muproService: MuproService) {
    this.user = this.muproService.user;
  }

  ngOnInit(): void {
  }

}
