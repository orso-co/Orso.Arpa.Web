import { Component, Input, OnInit } from '@angular/core';
import { PersonDto, MusicianProfileDto } from '@arpa/models';
import { first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ColumnDefinition } from '../../../../../../@arpa/components/table/table.component';
import { MuproService } from '../../services/mupro.service';
import { LoggerService, NotificationsService, SectionService, SelectValueService } from '@arpa/services';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MusicianLayoutComponent } from '../../../../musician-profile-dialog/musician-layout/musician-layout.component';
import { TranslateService } from '@ngx-translate/core';
import {
  MusicianMainInstrumentComponent
} from '../../../../musician-profile-dialog/musician-main-instrument/musician-main-instrument.component';
import {
  MusicianInstrumentsComponent
} from '../../../../musician-profile-dialog/musician-instruments/musician-instruments.component';


@Component({
  selector: 'arpa-person-profiles-musician',
  templateUrl: './person-profiles-musician.component.html',
  styleUrls: ['./person-profiles-musician.component.scss']
})
export class PersonProfilesMusicianComponent implements OnInit {
  @Input() person: PersonDto | null;

  tableData: BehaviorSubject<any> = new BehaviorSubject([])


  columns: ColumnDefinition<MusicianProfileDto>[] = [
    { label: 'persons.mupro.INSTRUMENT', property: 'instrument.name', type: 'text'},
    { label: 'persons.mupro.LEVEL_ASSESSMENT_TEAM', property: 'levelAssessmentTeam', type: 'rating'},
    { label: 'persons.mupro.BACKGROUND_TEAM', property: 'backgroundTeam', type: 'text'},

    // { label: 'persons.mupro.QUALIFICATION', property: 'qualificationId', type: 'state', stateTable: 'MusicianProfile', stateProperty: 'Qualification', show: true},

  ];

  constructor(
    private router: Router,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private sectionService: SectionService,
    private translate: TranslateService,
    private logger: LoggerService,
    private notificationsService: NotificationsService,
  ) {
  }
  onRowClick(person: PersonDto) {
    this.router
      .navigate(['/arpa', 'mupro', this.person!.id, 'projects'])
      .then(() => this.ref.close(true));
  }

  ngOnInit(): void {
    if (this.person) {
      this.tableData.next(this.person.musicianProfiles);
    }
   }


  createNewMuPro() {
    const ref = this.dialogService.open(MusicianInstrumentsComponent, {
      data: {
        profile: new BehaviorSubject({doublingInstruments: [],
          educations: [],
          curriculumVitaeReferences: [],
          preferredPositionsInnerIds: [],
          preferredPositionsTeamIds: [],
          preferredPartsInner: [],
          preferredPartsTeam: [],
          documents: [],
          regionPreferencesRehearsal: [],
          regionPreferencesPerformance: []}),
        sections: this.sectionService.sectionsLoaded ? this.sectionService.sections$ : this.sectionService.load(),
        personId: this.person?.id,
      },
      header: this.translate.instant('CREATE'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });

    ref.onClose.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.ref.close(profile);
      });
  }
}
