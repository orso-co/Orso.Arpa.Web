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
    { label: 'SURNAME', property: 'surname', type: 'text' },
    { label: 'GIVEN_NAME', property: 'givenName', type: 'text' },
    { label: 'INSTRUMENT', property: 'instrumentId', type: 'state', stateTable: 'MusicianProfiles', stateProperty: 'Instrument', show: true},
    { label: 'QUALIFICATION', property: 'qualification', type: 'text'},
    { label: 'LEVEL_ASSESSMENT_TEAM', property: 'levelAssessmentTeam', type: 'rating', show: true},
    { label: 'EXPERIENCE_LEVEL', property: 'experienceLevel', type: 'rating', show: true },
    { label: 'RELIABILITY', property: 'reliability', type: 'rating', show: true },
    { label: 'GENERAL_PREFERENCE', property: 'generalPreference', type: 'rating', show: true },
    { label: 'CREATED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'CREATED_BY', property: 'createdBy', type: 'text', show: false },
    { label: 'MODIFIED_AT', property: 'createdAt', type: 'date', show: false },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text', show: false },
  ];
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(public translate: TranslateService, private router: Router, private route: ActivatedRoute) {}

  onRowClick(person: PersonDto) {
    this.router.navigate([{ outlets: { modal: ['detail', person.id] } }], {
      relativeTo: this.route,
    });
  }
}
