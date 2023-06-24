import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectParticipationDto } from '@arpa/models';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  participation: ProjectParticipationDto;

  constructor(public config: DynamicDialogConfig, private ref: DynamicDialogRef) {}

  ngOnInit() {
    this.participation = this.config.data.projectParticipation;
  }

  getName() {
    return this.participation.person ? `${this.participation.person.givenName} ${this.participation.person.surname}` : '';
  }

  cancel() {
    this.ref.close(null);
  }
}
