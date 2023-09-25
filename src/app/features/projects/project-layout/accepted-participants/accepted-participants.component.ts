import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { DocumentNode } from 'graphql';
import { AccepptedParticipantsQuery } from './accepted-participations.graphql';
import { ProjectParticipationDto } from '@arpa/models';
import { filter, first, map } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectService } from '@arpa/services';
import { OnInit } from '@angular/core';
import { ParticipationDialogComponent } from '../../../participation-dialog/participation-dialog.component';

@Component({
  selector: 'arpa-accepted-participants',
  templateUrl: './accepted-participants.component.html',
  styleUrls: ['./accepted-participants.component.scss'],
})
export class AcceptedParticipantsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = Subscription.EMPTY;

  projectId: string;
  filteredDataCount: number;

  ready = false;

  query: DocumentNode = AccepptedParticipantsQuery;
  columns: ColumnDefinition<any>[] = [
    { label: 'projects.PARTICIPANTS', property: 'musicianProfile.person.displayName', type: 'text' },
    { label: 'projects.INSTRUMENT', property: 'musicianProfile.instrument.name', type: 'text' },
    {
      label: 'mupro.QUALIFICATION',
      property: 'musicianProfile.qualification.selectValue.name',
      type: 'badge',
      badgeStateMap: [
        { label: 'mupro.AMATEUR', value: 'AMATEUR', severity: 'success' },
        { label: 'mupro.STUDENT', value: 'STUDENT', severity: 'info' },
        { label: 'mupro.SEMI-PROFESSIONAL', value: 'SEMI-PROFESSIONAL', severity: 'warning' },
        { label: 'mupro.PROFESSIONAL', value: 'PROFESSIONAL', severity: 'warning' },
        { label: 'mupro.UNKNOWN', value: 'UNKNOWN', severity: 'danger' },
      ],
    },
  ];

  tableData = new BehaviorSubject<any[]>([]);
  totalReplies = 0;
  totalInvited = 0;
  innerStatsCount: Record<string, number> = {};
  innerStatsValues: number[] = [];
  innerStatsKeys: string[] = [];
  finalResultsCount: Record<string, number> = {};
  finalResultsValues: number[] = [];
  finalResultsKeys: string[] = [];
  personId: string | undefined;
  project: any;
  participations: ProjectParticipationDto[] = [];
  instrumentFinalResults: Record<string, number> = {};

  constructor(
    private config: DynamicDialogConfig,
    private translate: TranslateService,
    private dialogService: DialogService,
    private projectService: ProjectService
  ) {
    this.projectId = this.config.data.project.id;
  }

  ngOnInit(): void {
    this.reloadProjectDetails();
  }
  sortedInstrumentKeys: string[] = [];

  private reloadProjectDetails(): void {
    const variables = { projectId: this.projectId };
    const query = {
      query: this.query,
      variables,
    };
    this.projectService
      .query(query)
      .pipe(map((result: any) => result.data?.projects?.items?.[0]))
      .subscribe((result: any) => {
        this.project = result;
        const participations = this.project?.projectParticipations || [];
        const filteredParticipations = participations.filter(
          (participation: Record<string, any>) => participation.participationStatusResult === 'ACCEPTANCE'
        );
        filteredParticipations.forEach((participation: Record<string, any>) => {
          if (participation.participationStatusInner) {
            if (this.innerStatsCount[participation.participationStatusInner]) {
              this.innerStatsCount[participation.participationStatusInner] += 1;
            } else {
              this.innerStatsCount[participation.participationStatusInner] = 1;
            }
            this.totalReplies += 1;
          }
          this.finalResultsCount[participation.participationStatusResult] =
            (this.finalResultsCount[participation.participationStatusResult] || 0) + 1;
        });

        this.tableData.next([...filteredParticipations]);
        this.totalInvited = filteredParticipations.length;

        this.innerStatsValues = Object.values(this.innerStatsCount);
        this.innerStatsKeys = Object.keys(this.innerStatsCount).map((key) =>
          this.translate.instant(`projectParticipationStatusInner.${key}`)
        );
        this.finalResultsValues = Object.values(this.finalResultsCount);
        this.finalResultsKeys = Object.keys(this.finalResultsCount).map((key) =>
          this.translate.instant(`projectParticipationStatusInternal.${key}`)
        );
        this.ready = true;
        // Function to map each instrument to its general category
        const mapToGeneralCategory = (instrument: string) => {
          if (instrument.includes('Flute')) return 'Flute';
          if (instrument.includes('Oboe')) return 'Oboe';
          if (instrument.includes('English Horn')) return 'Oboe';
          if (instrument.includes('Bassoon')) return 'Bassoon';
          if (instrument.includes('Clarinet')) return 'Clarinet';
          if (instrument.includes('Saxophone')) return 'Saxophone';
          if (instrument.includes('Trombone')) return 'Trombone';
          // Add more mappings here as needed
          return instrument;
        };
        this.instrumentFinalResults = {};
        filteredParticipations.forEach((participation: Record<string, any>) => {
          const musicianProfile = participation.musicianProfile;
          if (musicianProfile && musicianProfile.instrument && musicianProfile.instrument.name) {
            const instrumentName = mapToGeneralCategory(musicianProfile.instrument.name);
            if (this.instrumentFinalResults[instrumentName]) {
              this.instrumentFinalResults[instrumentName]++;
            } else {
              this.instrumentFinalResults[instrumentName] = 1;
            }
          }
        });
        // Define your custom order here
        const customOrder = [
          'Flute',
          'Oboe',
          'Clarinet',
          'Saxophone',
          'Bassoon',
          'Horn',
          'Trumpet',
          'Flugelhorn',
          'Trombone',
          'Euphonium',
          'Tuba',
          'Timpani',
          'Mallets',
          'Percussion',
          'Drum Set',
          'Guitar',
          'Harp',
          'Piano',
          'Soprano',
          'Alto',
          'Tenor',
          'Bass',
          'Violin',
          'Viola',
          'Violoncello',
          'Double Bass',
        ];

        // Sort the keys based on the custom order
        this.sortedInstrumentKeys = Object.keys(this.instrumentFinalResults).sort((a, b) => {
          return customOrder.indexOf(a) - customOrder.indexOf(b);
        });
      });
  }

  onTableFiltered(event: any): void {
    this.filteredDataCount = event.filteredValue.length;
  }

  openParticipationDialog(row: any) {
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: { projectParticipation: { ...row, project: this.project } },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    const closeSubscription = ref.onClose.pipe(first()).subscribe(() => {
      this.reloadProjectDetails();
    });
    this.subscriptions.add(closeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected readonly filter = filter;
}
