import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { sortBy, uniq } from 'lodash-es';
import { NotificationsService } from '../../../core/services/notifications.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { first } from 'rxjs/operators';
import { AppointmentDto } from '../../../model/appointmentDto';
import { SectionDto } from '../../../model/sectionDto';
import { ProjectDto } from '../../../model/projectDto';
import { VenueDto } from '../../../model/venueDto';
import { RoomDto } from '../../../model/roomDto';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';

class ParticipationTableItem {
  givenName: string;
  surname: string;
  sections: string;
  qualification: string;
  predictionId: string;
  resultId: string;
  personId: string;

  constructor(
    personId: string,
    givenName: string,
    surname: string,
    sections: string,
    qualification: string,
    predictionId: string,
    resultId: string
  ) {
    this.givenName = givenName;
    this.surname = surname;
    this.sections = sections;
    this.qualification = qualification;
    this.resultId = resultId;
    this.predictionId = predictionId;
    this.personId = personId;
  }
}

@Component({
  selector: 'arpa-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex = 0;
  formGroup: FormGroup;

  appointment: AppointmentDto = this.config.data.appointment;
  sections: SectionDto[] = this.config.data.sections;
  projects: ProjectDto[] = this.config.data.projects;
  venues: VenueDto[] = this.config.data.venues;
  predictionOptions: SelectItem[] = this.config.data.predictionOptions;
  resultOptions: SelectItem[] = this.config.data.resultOptions;
  categoryOptions: SelectItem[] = this.config.data.categoryOptions;
  statusOptions: SelectItem[] = this.config.data.statusOptions;
  salaryPatternOptions: SelectItem[] = this.config.data.salaryPatternOptions;
  salaryOptions: SelectItem[] = this.config.data.salaryOptions;
  expectationOptions: SelectItem[] = this.config.data.expectationOptions;
  isAllDayEvent: boolean = this.config.data.isAllDayEvent;

  participationTableItems: ParticipationTableItem[] = [];
  projectOptions: ProjectDto[] = [];
  sectionOptions: SectionDto[] = [];
  roomOptions: RoomDto[] = [];
  rooms: RoomDto[] = [];
  venueOptions: SelectItem[] = [];
  sectionSelectItems: SelectItem[] = [];
  columns: any[] = [];
  filteredDataCount: number;
  qualificationOptions: SelectItem[] = [];

  get isNew(): boolean {
    return !this.appointment.id;
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notificationsService: NotificationsService,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fillForm();

    this.venueOptions = this.venues.map((v) => this.mapVenueToSelectItem(v));

    if (this.appointment.participations) {
      this.sectionSelectItems = sortBy(
        uniq(
          this.appointment.participations
            .map((p: any) => p.musicianProfiles)
            .reduce((a: any, b: any) => a.concat(b), [])
            .map((mp: any) => this.mapMusicianProfileToSectionSelectItem(mp))
        ),
        (selectItem) => selectItem.label
      );

      this.qualificationOptions = sortBy(
        uniq(
          this.appointment.participations
            .map((p) => p.musicianProfiles)
            .reduce((a: any, b: any) => a.concat(b), [])
            .map((mp: any) => this.mapMusicianProfileToQualificationSelectItem(mp))
        ),
        (selectItem) => selectItem.label
      );

      this.mapParticipations();
    }

    this.setRooms(this.appointment.venueId);

    this.columns = [
      { field: 'surname', header: this.translate.instant('SURNAME') },
      { field: 'givenName', header: this.translate.instant('GIVENNAME') },
      { field: 'sections', header: this.translate.instant('editappointments.SECTIONS') },
      { field: 'qualification', header: this.translate.instant('editappointments.LEVEL') },
      { field: 'predictionId', header: this.translate.instant('editappointments.PREDICTION') },
      { field: 'resultId', header: this.translate.instant('editappointments.RESULTS') },
    ];

    this.createStepperMenu();
  }

  onSubmit(continueToNextStep: boolean): void {
    if (this.formGroup.invalid || this.formGroup.pristine) {
      return;
    }
    if (this.isNew) {
      this.createAppointment({ ...this.appointment, ...this.formGroup.value }, continueToNextStep);
    } else {
      this.updateAppointment({ ...this.appointment, ...this.formGroup.value }, continueToNextStep);
    }
  }

  mapVenueToSelectItem(venue: VenueDto): SelectItem {
    return { label: `${venue?.address?.city} ${venue?.address?.urbanDistrict} | ${venue?.name}`, value: venue?.id };
  }

  mapMusicianProfileToSectionSelectItem(musicianProfile: MusicianProfileDto): SelectItem {
    return { label: musicianProfile.sectionName, value: musicianProfile.sectionName };
  }

  mapMusicianProfileToQualificationSelectItem(musicianProfile: MusicianProfileDto): SelectItem {
    return { label: musicianProfile.qualification, value: musicianProfile.qualification };
  }

  updateAppointment(appointment: AppointmentDto, continueToNextStep: boolean): void {
    this.appointmentService
      .update(appointment)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('editappointments.APPOINTMENT_UPDATED');
        if (continueToNextStep) {
          this.appointment = appointment;
          this.fillForm();
          this.activeIndex = 1;
        } else {
          this.ref.close(appointment);
        }
      });
  }

  createAppointment(appointment: AppointmentDto, continueToNextStep: boolean): void {
    this.appointmentService
      .create(appointment)
      .pipe(first())
      .subscribe((result) => {
        this.notificationsService.success('editappointments.APPOINTMENT_CREATED');
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

  setRooms(venueId: string): void {
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
        p.title.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) && !this.appointment.projects.map((r: any) => r.id).includes(p.id)
    );
  }

  searchSection(event: any): void {
    this.sectionOptions = this.sections.filter(
      (p) =>
        p.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) && !this.appointment.sections.map((r: any) => r.id).includes(p.id)
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
        this.notificationsService.success('editappointments.VENUE_SET');
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
          this.notificationsService.success('editappointments.ROOM_REMOVED');
        }
      });
  }

  addRoom(roomId: string): void {
    this.appointmentService
      .addRoom(this.appointment.id, roomId)
      .pipe(first())
      .subscribe((_) => {
        this.notificationsService.success('editappointments.ROOM_ADDED');
      });
  }

  removeSection(sectionId: string): void {
    this.appointmentService
      .removeSection(this.appointment.id, sectionId)
      .pipe(first())
      .subscribe((result) => {
        this.appointment = result;
        this.mapParticipations();
        this.notificationsService.success('editappointments.SECTION_REMOVED');
      });
  }

  addSection(sectionId: string): void {
    this.appointmentService.addSection(this.appointment.id, sectionId).subscribe((result) => {
      this.appointment = result;
      this.mapParticipations();
      this.notificationsService.success('editappointments.SECTION_ADDED');
    });
  }

  removeProject(projectId: string): void {
    this.appointmentService
      .removeProject(this.appointment.id, projectId)
      .pipe(first())
      .subscribe((result) => {
        this.appointment = result;
        this.mapParticipations();
        this.notificationsService.success('editappointments.PROJECT_REMOVED');
      });
  }

  addProject(projectId: string): void {
    this.appointmentService
      .addProject(this.appointment.id, projectId)
      .pipe(first())
      .subscribe((result) => {
        this.appointment = result;
        this.mapParticipations();
        this.notificationsService.success('editappointments.PROJECT_ADDED');
      });
  }

  getSectionNames(musicianProfiles: MusicianProfileDto[]): string {
    return musicianProfiles.map((p) => p.sectionName).join(', ');
  }

  onTableFiltered(event: any): void {
    this.filteredDataCount = event.filteredValue.length;
  }

  onResultChanged(item: ParticipationTableItem, event: any): void {
    this.appointmentService
      .setResult(item.personId, this.appointment.id, event.value)
      .pipe(first())
      .subscribe((_) => {
        this.notificationsService.success('editappointments.RESULT_SET');
      });
  }

  onAllDayChanged(isAllDay: boolean) {
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
      message: this.translate.instant('editappointments.ARE_YOU_SURE'),
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
      statusId: [null],
      salaryId: [null],
      salaryPatternId: [null],
      expectationId: [null],
    });
  }

  private mapParticipations(): void {
    this.participationTableItems = [];
    this.appointment.participations.forEach((element: any) => {
      this.participationTableItems.push(
        new ParticipationTableItem(
          element.person.id,
          element.person.givenName,
          element.person.surname,
          this.getSectionNames(element.musicianProfiles),
          element.musicianProfiles.map((mp: any) => mp.qualification).join(', '),
          element.participation ? element.participation.predictionId : '',
          element.participation ? element.participation.resultId : '',
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
        label: this.translate.instant('editappointments.BASICDATA'),
        command: (event: any) => {
          this.activeIndex = 0;
        },
      },
      {
        label: this.translate.instant('editappointments.ADDITIONALDATA'),
        disabled: this.isNew,
        command: (event: any) => {
          this.activeIndex = 1;
        },
      },
      {
        label: this.translate.instant('editappointments.PARTICIPATIONS'),
        disabled: this.isNew,
        command: (event: any) => {
          this.activeIndex = 2;
        },
      },
    ];
  }

  private deleteAppointment(): void {
    this.appointmentService.delete(this.appointment.id).subscribe(() => {
      this.notificationsService.success('editappointments.APPOINTMENT_DELETED');
      this.ref.close(this.appointment.id);
    });
  }
}
