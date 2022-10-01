import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PersonDto } from '../../../../@arpa/models/personDto';

@Component({
  selector: 'arpa-person-layout',
  templateUrl: './person-layout.component.html',
  styleUrls: ['./person-layout.component.scss'],
})
export class PersonLayoutComponent {
  public index = 0;
  public person: PersonDto = this.config.data.person;

  constructor(public config: DynamicDialogConfig, private ref: DynamicDialogRef) {}

  viewStateEvents(event: any) {
    this.index = event.state || 0;
  }

  personSaved($event: PersonDto) {
    if (!$event) {
      this.close(true);
    } else {
      this.person = $event;
    }
  }

  close(updateState: boolean) {
    this.ref.close(updateState);
  }
}
