import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PersonDto } from './../../../../@arpa/models/personDto';
import { Observable } from 'rxjs';



@Component({
  selector: 'arpa-person-layout',
  templateUrl: './person-layout.component.html',
  styleUrls: ['./person-layout.component.scss']
})
export class PersonLayoutComponent {

  public index = 0;
  public profile: Observable<PersonDto> = this.config.data.profile;

  constructor(public config: DynamicDialogConfig) {

  }

  viewStateEvents(event: any) {
    this.index = event.state || 0;
  }

}
