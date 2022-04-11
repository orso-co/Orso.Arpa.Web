import { PersonInviteResultDto } from './../../../../@arpa/models/personInviteResultDto';
import { OverlayPanel } from 'primeng/overlaypanel';
import { NotificationsService } from 'src/@arpa/services/notifications.service';
import { NotificationsMockService } from './../../../../testing/notifications.mock.service';
import { PersonService } from './../../persons/services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { Component, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DocumentNode } from 'graphql';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { MusicianDialogEntryComponent } from './../../musician-profile-dialog/musician-dialog-entry/musician-dialog-entry.component';
import { MusicianProfileDto } from './../../../../@arpa/models/musicianProfileDto';
import { Observable } from 'rxjs';
import { PerformerDto } from './../../../../@arpa/models/performerDto';
import { PerformersQuery } from './performers.graphql';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';

@Component({
  selector: 'arpa-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.scss'],
})
@Unsubscribe()
export class PerformerListComponent {
  state: Observable<SelectItem>;
  query: DocumentNode = PerformersQuery;
  lastInvitation: PersonInviteResultDto;

  columns: ColumnDefinition<PerformerDto>[] = [
    { label: 'SURNAME', property: 'person.surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'person.givenName', type: 'text' },
    { label: 'SECTION', property: 'instrumentId.section', type: 'text', show: false},
    { label: 'INSTRUMENT', property: 'instrument.name', type: 'text', show: true},
    { label: 'QUALIFICATION', property: 'qualificationId', type: 'state', stateTable: 'MusicianProfile', stateProperty: 'Qualification', show: true},
    { label: 'LEVEL_ASSESSMENT_TEAM', property: 'levelAssessmentTeam', type: 'text', show: true},
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'text', show: false },
    { label: 'RELIABILITY', property: 'reliability', type: 'text', show: false },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'text', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
    { label: 'USER_CREATED_AT', property: 'person.user.createdAt', type: 'date', show: false }
  ];
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private personService: PersonService,
    private notificationService: NotificationsService
    ) {}

  onRowClick(MusicianProfileDto: MusicianProfileDto) {
    this.dialogService.open(MusicianDialogEntryComponent, {
      data: {
        MusicianProfileDto,
      },
    });
  }

  sendSingleInvite(id: string){
    this.personService
        .invitePersons([id])
        .subscribe(() => {
          this.notificationService.success('PERSON_INVITED');
        });
  }


  sendInvitationToMultiplePersons(event: any, overlayPanel: OverlayPanel) {
    this.personService
      .invitePersons(this.feedSource.values.getValue().map(mupro => mupro.personId))
      .subscribe((result) => {
        this.lastInvitation = result;
        overlayPanel.show(event)
      });
  }
}
