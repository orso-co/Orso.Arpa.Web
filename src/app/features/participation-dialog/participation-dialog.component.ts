import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectParticipationDto } from '@arpa/models';
import { MuproService } from '../mupro/services/mupro.service';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  participation: ProjectParticipationDto;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private muproService: MuproService) {}

  ngOnInit() {
    const configData = this.config.data.projectParticipation;
    const projectId = configData.project!.id || '';
    const muproId = configData.musicianProfile!.id || '';
    this.muproService.getParticipationInProject(muproId, projectId).subscribe((response) => {
      this.participation = response;
    });
  }

  getName() {
    if (this.participation?.person) {
      return `${this.participation.person.givenName} ${this.participation.person.surname}`;
    }
    return '';
  }

  getInstrument() {
    if (this.participation?.musicianProfile?.instrumentName) {
      return `${this.participation.musicianProfile.instrumentName}`;
    }
    return '';
  }

  cancel() {
    this.ref.close(null);
  }
}
