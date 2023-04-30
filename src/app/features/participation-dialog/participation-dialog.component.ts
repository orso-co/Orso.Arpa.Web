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
    const project = this.config.data.project;
    this.children = project.children ? project.children : [];
    this.projectTitle = project.title;
    this.projectId = project.id;
    this.parentProject = project.parentProject?.title || '';
    this.participations = project.projectParticipations.filter(
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
