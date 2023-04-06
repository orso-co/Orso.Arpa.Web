import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReducedPersonDto, ProjectParticipationDto, ProjectDto } from '@arpa/models';

@Component({
  selector: 'arpa-participation-dialog',
  templateUrl: './participation-dialog.component.html',
  styleUrls: ['./participation-dialog.component.scss'],
})
export class ParticipationDialogComponent implements OnInit {
  participations: ProjectParticipationDto[];
  projectTitle: string;
  person: ReducedPersonDto | null;
  projectId: string;
  musicianId: string;
  parentProject: string;
  children: ProjectDto[];

  constructor(public config: DynamicDialogConfig, private ref: DynamicDialogRef) {}

  ngOnInit() {
    this.children = this.config.data.project.children;
    this.projectTitle = this.config.data.project.title;
    this.projectId = this.config.data.project.id;
    this.parentProject = this.config.data.project.parentProject?.title || '';
    this.participations = this.config.data.project.projectParticipations.filter(
      (participation: any) => participation.musicianProfile.person.id === this.config.data.personId
    );
    if (this.participations?.length) {
      this.person = this.participations[0]!.musicianProfile?.person || null;
      this.musicianId = this.participations[0]!.musicianProfile!.id!;
    }
  }

  getName() {
    return this.person ? `${this.person.givenName} ${this.person.surname}` : '';
  }

  cancel() {
    this.ref.close(null);
  }
}
