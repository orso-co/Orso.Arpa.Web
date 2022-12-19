import { Component, Input, OnInit } from '@angular/core';
import { PersonDto, MusicianProfileDto } from '@arpa/models';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from '../../../../../../@arpa/components/table/table.component';
import { SectionService } from '@arpa/services';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { MusicianInstrumentsComponent } from '../../../../musician-profile-dialog/musician-instruments/musician-instruments.component';


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
  ];

  constructor(
    private router: Router,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private sectionService: SectionService,
    private translate: TranslateService,
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
