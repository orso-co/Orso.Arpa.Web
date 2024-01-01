import {
  AppointmentParticipationListItemDto,
  ReducedMusicianProfileDto,
  AppointmentDto,
  SectionsAllDto,
  ProjectDto,
  VenueDto,
  RoomDto,
  AppointmentParticipationPrediction,
  AppointmentParticipationResult,
  AppointmentModifyBodyDto,
  AppointmentCreateDto,
} from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { sortBy, uniq } from 'lodash-es';
import { EnumService, NotificationsService, ProjectService, SectionService, SelectValueService, VenueService } from '@arpa/services';
import { AppointmentService } from '../services/appointment.service';
import { first, map } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { Table } from 'primeng/table';

class ParticipationTableItem {
  givenName: string;
  surname: string;
  sections: string;
  qualification: string;
  prediction?: AppointmentParticipationPrediction;
  result?: AppointmentParticipationResult;
  personId: string;
  commentByPerformerInner?: string;

  constructor(
    personId: string,
    givenName: string,
    surname: string,
    sections: string,
    qualification: string,
    prediction?: AppointmentParticipationPrediction,
    result?: AppointmentParticipationResult,
    commentByPerformerInner?: string
  ) {
    this.givenName = givenName;
    this.surname = surname;
    this.sections = sections;
    this.qualification = qualification;
    this.result = result;
    this.prediction = prediction;
    this.personId = personId;
    this.commentByPerformerInner = commentByPerformerInner;
  }
}

@Component({
  selector: 'arpa-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {
  @ViewChild('participationTable') table: Table;
  items: MenuItem[] = [];
  activeIndex = 0;
  formGroup: UntypedFormGroup;
  ready = false;

  appointment: AppointmentDto;
  areParticipationsAlreadyLoaded = false;
  isAllDayEvent: boolean;

  // loaded in loadData()
  sections: SectionsAllDto[];
  projects: ProjectDto[];
  venues: VenueDto[];
  predictionOptions: SelectItem[];
  resultOptions: SelectItem[];
  salaryOptions: SelectItem[];
  salaryPatternOptions: SelectItem[];
  expectationOptions: SelectItem[];
  categoryOptions: SelectItem[];
  statusOptions: SelectItem[];

  // transformed in code
  rooms: RoomDto[] = [];
  projectOptions: ProjectDto[] = [];
  sectionOptions: SectionsAllDto[] = [];
  roomOptions: RoomDto[] = [];
  venueOptions: SelectItem[] = [];
  sectionSelectItems: SelectItem[] = [];
  qualificationOptions: SelectItem[] = [];

  participationTableItems: ParticipationTableItem[] = [];
  columns: any[] = [];
  filteredDataCount: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notificationsService: NotificationsService,
    private appointmentService: AppointmentService,
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService,
    private confirmationService: ConfirmationService,
    private selectValueService: SelectValueService,
    private enumService: EnumService,
    private projectsService: ProjectService,
    private venuesService: VenueService,
    private sectionService: SectionService
  ) {}

  get isNew(): boolean {
    return !this.appointment.id;
  }

  ngOnInit(): void {
    this.createForm();
    this.loadData();
    this.columns = [
      { field: 'surname', header: this.translate.instant('SURNAME'), width: '20%' },
      { field: 'givenName', header: this.translate.instant('GIVENNAME'), width: '20%' },
      { field: 'prediction', header: this.translate.instant('appointments.PREDICTION'), width: '20%' },
      { field: 'result', header: this.translate.instant('appointments.RESULTS'), width: '20%' },
      { field: 'sections', header: this.translate.instant('appointments.SECTIONS'), width: '20%' },
      // { field: 'qualification', header: this.translate.instant('appointments.QUALIFICATION'), width: '20%' },
    ];
    this.createStepperMenu();
  }

  private loadData() {
    console.log(this.config.data);
    this.appointment = this.config.data.appointment;
    this.isAllDayEvent = this.config.data.isAllDayEvent;
    const sections$ = this.config.data.sections ? of(this.config.data.sections) : this.sectionService.sectionsAll$;
    const projects$ = this.config.data.projects ? of(this.config.data.projects) : this.projectsService.load();
    const venues$ = this.config.data.venues ? of(this.config.data.venues) : this.venuesService.load();
    const salaries$ = this.config.data.salaryOptions
      ? of(this.config.data.salaryOptions)
      : this.selectValueService.getAppointmentSalaries();
    const salaryPatterns$ = this.config.data.salaryPatternOptions
      ? of(this.config.data.salaryPatternOptions)
      : this.selectValueService.getAppointmentSalaryPatterns();
    const expectations$ = this.config.data.expectationOptions
      ? of(this.config.data.expectationOptions)
      : this.selectValueService.getAppointmentExpectations();
    const categories$ = this.config.data.categoryOptions
      ? of(this.config.data.categoryOptions)
      : this.selectValueService.getAppointmentCategories();
    const results$ = this.config.data.resultOptions
      ? of(this.config.data.resultOptions)
      : this.enumService.getAppointmentParticipationResultSelectItems();
    const predictions$ = this.config.data.predictionOptions
      ? of(this.config.data.predictionOptions)
      : this.enumService.getAppointmentParticipationPredictionSelectItems();
    const status$ = this.config.data.statusOptions
      ? of(this.config.data.statusOptions)
      : this.enumService.getAppointmentStatusSelectItems();
    zip(
      status$.pipe(
        map((result) => {
          this.statusOptions = result;
        })
      ),
      results$.pipe(
        map((result) => {
          this.resultOptions = result;
        })
      ),
      predictions$.pipe(
        map((result) => {
          this.predictionOptions = result;
        })
      ),
      sections$.pipe(
        map((result) => {
          this.sections = result;
        })
      ),
      projects$.pipe(
        map((result) => {
          this.projects = result;
        })
      ),
      venues$.pipe(
        map((result) => {
          this.venues = result;
        })
      ),
      salaries$.pipe(
        map((result) => {
          this.salaryOptions = result;
        })
      ),
      salaryPatterns$.pipe(
        map((result) => {
          this.salaryPatternOptions = result;
        })
      ),
      expectations$.pipe(
        map((result) => {
          this.expectationOptions = result;
        })
      ),
      categories$.pipe(
        map((result) => {
          this.categoryOptions = result;
        })
      )
    ).subscribe(() => {
      this.fillForm();

      this.venueOptions = this.venues?.map((v) => this.mapVenueToSelectItem(v));
      this.setRooms(this.appointment.venueId);
      this.ready = true;
    });
  }

  onSubmit(continueToNextStep: boolean): void {
    if (this.formGroup.invalid || this.formGroup.pristine) {
      return;
    }
    if (this.isNew) {
      this.createAppointment({ ...this.appointment, ...this.formGroup.value }, continueToNextStep);
    } else {
      this.updateAppointment(
        {
          id: this.appointment.id,
          categoryId: this.appointment.categoryId,
          startTime: this.appointment.startTime,
          endTime: this.appointment.endTime,
          name: this.appointment.name,
          publicDetails: this.appointment.publicDetails,
          internalDetails: this.appointment.internalDetails,
          status: this.appointment.status,
          salaryId: this.appointment.salaryId,
          salaryPatternId: this.appointment.salaryPatternId,
          expecationId: this.appointment.expectationId,
          ...this.formGroup.value,
        },
        continueToNextStep
      );
    }
  }

  onActiveIndexChange(event: number) {
    if (event === 2 && !this.areParticipationsAlreadyLoaded) {
      this.ready = false;
      this.appointmentService.getById(this.appointment.id, true).subscribe(
        (appointment) => {
          this.appointment = appointment;
          this.areParticipationsAlreadyLoaded = true;
          if (this.appointment.participations) {
            this.sectionSelectItems = sortBy(
              uniq(
                this.appointment.participations
                  .map((p: AppointmentParticipationListItemDto) => p.musicianProfiles ?? [])
                  .reduce((a, b) => a.concat(b), [])
                  .map((mp: ReducedMusicianProfileDto) => mp?.instrumentName ?? '')
              ).map((val) => ({ label: val, value: val })),
              (selectItem) => selectItem.label
            );

            this.qualificationOptions = sortBy(
              uniq(
                this.appointment.participations
                  .map((p: AppointmentParticipationListItemDto) => p.musicianProfiles ?? [])
                  .reduce((a, b) => a.concat(b), [])
                  .map((mp: ReducedMusicianProfileDto) => mp?.qualification ?? '')
              ).map((val) => ({ label: val, value: val })),
              (selectItem) => selectItem.label
            );

            this.mapParticipations();
            this.ready = true;
          }
        },
        () => (this.ready = true)
      );
    }
  }

  mapVenueToSelectItem(venue: VenueDto): SelectItem {
    return { label: `${venue?.address?.city} ${venue?.address?.urbanDistrict} | ${venue?.name}`, value: venue?.id };
  }

  updateAppointment(appointment: AppointmentModifyBodyDto, continueToNextStep: boolean): void {
    this.appointmentService
      .update(appointment)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('appointments.APPOINTMENT_UPDATED');
        if (continueToNextStep) {
          this.appointment = { ...this.appointment, ...appointment };
          this.fillForm();
          this.activeIndex = 1;
        } else {
          this.ref.close(appointment);
        }
      });
  }

  createAppointment(appointment: AppointmentCreateDto, continueToNextStep: boolean): void {
    this.appointmentService
      .create(appointment)
      .pipe(first())
      .subscribe((result) => {
        this.notificationsService.success('appointments.APPOINTMENT_CREATED');
        if (continueToNextStep) {
          this.appointment = result;
          this.fillForm();
          this.createStepperMenu();
          this.activeIndex = 1;
        } else {
          this.ref.close(result);
        }
      });
  }

  setRooms(venueId: string | undefined): void {
    if (venueId && this.venues) {
      const venue = this.venues.find((v) => v.id === venueId);
      if (venue) {
        this.rooms = venue.rooms || [];
        return;
      }
      this.rooms = [];
    }
  }

  searchProject(event: any): void {
    this.projectOptions = this.projects.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) &&
        !this.appointment.projects.map((r: any) => r.id).includes(p.id)
    );
  }

  searchSection(event: any): void {
    this.sectionOptions = this.sections.filter(
      (p) =>
        p.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) &&
        !this.appointment.sections.map((r: any) => r.id).includes(p.id)
    );
  }

  searchRoom(event: any): void {
    this.roomOptions = this.rooms.filter(
      (p) => p.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) && !this.appointment.rooms.map((r) => r.id).includes(p.id)
    );
  }

  onVenueChanged(event: any): void {
    this.appointmentService
      .setVenue(this.appointment.id, event.value)
      .pipe(first())
      .subscribe((_) => {
        this.notificationsService.success('appointments.VENUE_SET');
        this.appointment.rooms.forEach((room: any) => {
          this.removeRoom(room.id, false);
        });
        this.appointment.rooms = [];
        this.setRooms(event.value);
      });
  }

  onProjectAdded(event: any): void {
    this.addProject(event.id);
  }

  onProjectRemoved(event: any): void {
    this.removeProject(event.id);
  }

  onSectionAdded(event: any): void {
    this.addSection(event.id);
  }

  onSectionRemoved(event: any): void {
    this.removeSection(event.id);
  }

  onRoomAdded(event: any): void {
    this.addRoom(event.id);
  }

  onRoomRemoved(event: any): void {
    this.removeRoom(event.id, true);
  }

  removeRoom(roomId: string, showToast: boolean): void {
    this.appointmentService
      .removeRoom(this.appointment.id, roomId)
      .pipe(first())
      .subscribe((_) => {
        if (showToast) {
          this.notificationsService.success('appointments.ROOM_REMOVED');
        }
      });
  }

  addRoom(roomId: string): void {
    this.appointmentService
      .addRoom(this.appointment.id, roomId)
      .pipe(first())
      .subscribe((_) => {
        this.notificationsService.success('appointments.ROOM_ADDED');
      });
  }

  removeSection(sectionId: string): void {
    this.appointmentService
      .removeSection(this.appointment.id, sectionId)
      .pipe(first())
      .subscribe((result) => {
        this.appointment = result;
        this.areParticipationsAlreadyLoaded = false;
        this.notificationsService.success('appointments.SECTION_REMOVED');
      });
  }

  addSection(sectionId: string): void {
    this.appointmentService.addSection(this.appointment.id, sectionId).subscribe((result) => {
      this.appointment = result;
      this.areParticipationsAlreadyLoaded = false;
      this.notificationsService.success('appointments.SECTION_ADDED');
    });
  }

  removeProject(projectId: string): void {
    this.appointmentService
      .removeProject(this.appointment.id, projectId)
      .pipe(first())
      .subscribe((result) => {
        this.appointment = result;
        this.areParticipationsAlreadyLoaded = false;
        this.notificationsService.success('appointments.PROJECT_REMOVED');
      });
  }

  addProject(projectId: string): void {
    this.appointmentService
      .addProject(this.appointment.id, projectId)
      .pipe(first())
      .subscribe((result) => {
        this.appointment = result;
        this.areParticipationsAlreadyLoaded = false;
        this.notificationsService.success('appointments.PROJECT_ADDED');
      });
  }

  getSectionNames(musicianProfiles: ReducedMusicianProfileDto[]): string {
    return musicianProfiles.map((p) => p.instrumentName).join(', ');
  }

  onTableFiltered(event: any): void {
    this.filteredDataCount = event.filteredValue.length;
  }

  onResultChanged(item: ParticipationTableItem, event: any): void {
    this.appointmentService
      .setResult(item.personId, this.appointment.id, event.value)
      .pipe(first())
      .subscribe((_) => {
        this.notificationsService.success('appointments.RESULT_SET');
      });
  }

  onPredictionChanged(item: ParticipationTableItem, event: any): void {
    this.appointmentService
      .setPrediction(item.personId, this.appointment.id, event.value)
      .pipe(first())
      .subscribe((_) => {
        this.notificationsService.success('appointments.PREDICTION_SET');
      });
  }

  onAllDayChanged(isAllDay: boolean) {
    this.isAllDayEvent = isAllDay;

    if (isAllDay) {
      const endDate = new Date(this.formGroup.get('endTime')?.value);
      const startDate = new Date(this.formGroup.get('startTime')?.value);

      startDate.setHours(0, 0);
      endDate.setHours(23, 59);

      this.formGroup.get('endTime')?.setValue(endDate);
      this.appointment.endTime = this.formGroup.get('endTime')?.value;

      this.formGroup.get('startTime')?.setValue(startDate);
      this.appointment.startTime = this.formGroup.get('startTime')?.value;
      this.formGroup.markAsDirty();

      // TO DO:
      // depending on further decisions whether to split date and time selection:
      // if time selection ends up separate, disable time selection control for end date to avoid confusion.
    }
  }

  showDeleteConfirmation(event: Event): void {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: this.translate.instant('appointments.ARE_YOU_SURE'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.deleteAppointment();
      },
    });
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      allDay: [{ checked: this.config.data.allDay }],
      publicDetails: [null],
      internalDetails: [null],
      categoryId: [null],
      status: [null],
      salaryId: [null],
      salaryPatternId: [null],
      expectationId: [null],
    });
  }

  private mapParticipations(): void {
    this.participationTableItems = [];
    this.appointment.participations.forEach((element: AppointmentParticipationListItemDto) => {
      this.participationTableItems.push(
        new ParticipationTableItem(
          element.person?.id ?? '',
          element.person?.givenName ?? '',
          element.person?.surname ?? '',
          this.getSectionNames(element.musicianProfiles ?? []),
          element.musicianProfiles?.map((mp: any) => mp.qualification).join(', ') ?? '',
          element.participation?.prediction,
          element.participation?.result,
          element.participation?.commentByPerformerInner
        )
      );
    });
    this.filteredDataCount = this.participationTableItems.length;
  }

  private fillForm(): void {
    this.formGroup.reset({
      ...this.appointment,
      startTime: new Date(this.appointment.startTime),
      endTime: new Date(this.appointment.endTime),
      allDay: this.isAllDayEvent,
    });
  }

  private createStepperMenu(): void {
    this.items = [
      {
        label: this.translate.instant('appointments.BASICDATA'),
        command: () => {
          this.activeIndex = 0;
        },
      },
      {
        label: this.translate.instant('appointments.ADDITIONALDATA'),
        disabled: this.isNew,
        command: () => {
          this.activeIndex = 1;
        },
      },
      {
        label: this.translate.instant('appointments.RESULTS'),
        disabled: this.isNew,
        command: () => {
          this.activeIndex = 2;
        },
      },
    ];
  }

  private deleteAppointment(): void {
    this.appointmentService.delete(this.appointment.id).subscribe(() => {
      this.notificationsService.success('appointments.APPOINTMENT_DELETED');
      this.ref.close(this.appointment.id);
    });
  }
  exportCSV() {
    this.table.exportCSV();
  }

  public onSendNotification(event: Event) {
    this.sendNotification(false, event);
  }

  private sendNotification(force: boolean, event?: Event) {
    this.appointmentService
      .sendNotification(this.appointment.id, force)
      .pipe(first())
      .subscribe(
        () => {
          this.notificationsService.success('appointments.NOTIFICATION_SENT');
        },
        (error: any) => {
          console.log(error);
          if (error.errors?.ForceSending && !force) {
            this.showNotificationConfirmation(error.errors.ForceSending[0], event);
          }
          if (error.errors?.AppointmentId) {
            this.notificationsService.error(error.errors.AppointmentId[0]);
          } else {
            this.notificationsService.error(error!.title);
          }
        }
      );
  }

  private showNotificationConfirmation(confirmationMessage: string, event?: Event) {
    this.confirmationService.confirm({
      target: event?.target || undefined,
      message: confirmationMessage,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.sendNotification(true);
      },
    });
  }
}
