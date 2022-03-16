import { MusicianMainInstrumentComponent } from './../../musician-profile-dialog/musician-main-instrument/musician-main-instrument.component';
import { MuproComponent } from './../../mupro/mupro.component';
import { ProfilesComponent } from './../../mupro/profiles/profiles.component';
import { DetailsComponent } from './../../mupro/details/details.component';
import { MusicianDocumentsComponent } from './../../musician-profile-dialog/musician-documents/musician-documents.component';
import { MusicianLayoutComponent } from './../../musician-profile-dialog/musician-layout/musician-layout.component';
import { MusicianInstrumentsComponent } from './../../musician-profile-dialog/musician-instruments/musician-instruments.component';
import { MusicianProfileDialogModule } from './../../musician-profile-dialog/musician-profile-dialog.module';
import { SectionDto } from './../../../../@arpa/models/sectionDto';
import { MusicianDialogEntryComponent } from './../../musician-profile-dialog/musician-dialog-entry/musician-dialog-entry.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MusicianProfileDto } from './../../../../@arpa/models/musicianProfileDto';
import { PerformerDto } from './../../../../@arpa/models/performerDto';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild } from '@angular/core';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { PerformersQuery } from './performers.graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { Observable } from 'rxjs';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentNode } from 'graphql';

@Component({
  selector: 'arpa-person-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.scss'],
})
@Unsubscribe()
export class PerformerListComponent {
  state: Observable<SelectItem>;
  query: DocumentNode = PerformersQuery;

  columns: ColumnDefinition<PerformerDto>[] = [
    { label: 'SURNAME', property: 'person.surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'person.givenName', type: 'text' },
    { label: 'SECTION', property: 'instrumentId.section', type: 'text'},
    { label: 'INSTRUMENT', property: 'instrument.name', type: 'text', show: true},
    { label: 'QUALIFICATION', property: 'qualificationId', type: 'state', stateTable: 'MusicianProfile', stateProperty: 'Qualification', show: true},
    { label: 'LEVEL_ASSESSMENT_TEAM', property: 'levelAssessmentTeam', type: 'rating', show: true},
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'rating', show: false },
    { label: 'RELIABILITY', property: 'reliability', type: 'rating', show: false },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'rating', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
  ];
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    ) {}

  onRowClick(MusicianProfileDto: MusicianProfileDto) {
    this.dialogService.open(MusicianDialogEntryComponent, {
      data: {
        MusicianProfileDto,
        comboInstrumentView: this.route.snapshot.queryParamMap.get('comboInstruments') || false,
      },
    });
  }

  sendInvite(personId: PersonDto, id: MusicianProfileDto) {
    const ref = this.dialogService.open(MusicianDialogEntryComponent, {
      data: {
        personId,
        id,
      },
    });
  }

}
