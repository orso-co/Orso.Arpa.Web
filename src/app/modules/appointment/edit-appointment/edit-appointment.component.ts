import { TranslateService } from '@ngx-translate/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { IAppointmentDto, IMusicianProfileDto, IProjectDto, IRoomDto, IVenueDto } from 'src/app/models/appointment';
import { ISectionDto } from 'src/app/models/section';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

class ParticipationTableItem {
  givenName: string;
  surname: string;
  sections: string;
  isProfessional: string;
  predictionId: string;
  resultId: string;
  personId: string;

  constructor(
    personId: string,
    givenName: string,
    surname: string,
    sections: string,
    isProfessional: string,
    predictionId: string,
    resultId: string
  ) {
    this.givenName = givenName;
    this.surname = surname;
    this.sections = sections;
    this.isProfessional = isProfessional;
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

  appointment: IAppointmentDto = this.config.data.appointment;
  sections: ISectionDto[] = this.config.data.sections;
  projects: IProjectDto[] = this.config.data.projects;
  venues: IVenueDto[] = this.config.data.venues;
  predictionOptions: SelectItem[] = this.config.data.predictionOptions;
  resultOptions: SelectItem[] = this.config.data.resultOptions;
  categoryOptions: SelectItem[] = this.config.data.categoryOptions;
  statusOptions: SelectItem[] = this.config.data.statusOptions;
  emolumentPatternOptions: SelectItem[] = this.config.data.emolumentPatternOptions;
  emolumentOptions: SelectItem[] = this.config.data.emolumentOptions;
  expectationOptions: SelectItem[] = this.config.data.expectationOptions;

  participationTableItems: ParticipationTableItem[] = [];
  projectOptions: IProjectDto[] = [];
  sectionOptions: ISectionDto[] = [];
  roomOptions: IRoomDto[] = [];
  rooms: IRoomDto[] = [];
  venueOptions: SelectItem[] = [];
  sectionSelectItems: SelectItem[] = [];
  isProfessionalOptions: SelectItem[] = [];
  columns: any[] = [];
  filteredDataCount: number;

  get isNew(): boolean {
    return !this.appointment.id;
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fillForm();

    this.venueOptions = this.venues.map((v) => this.mapVenueToSelectItem(v));

    if (this.appointment.participations) {
      this.sectionSelectItems = this.appointment.participations
        .map(p => p.musicianProfiles)
        .reduce((a, b) => a.concat(b), [])
        .map((mp) => this.mapMusicianProfileToSelectItem(mp));
      this.setRooms(this.appointment.venueId);

      this.mapParticipations();
    }

    this.isProfessionalOptions = [
      { label: this.translate.instant('Yes'), value: 'Yes' },
      { label: this.translate.instant('No'), value: 'No' },
    ];

    this.columns = [
      { field: 'surname', header: this.translate.instant('SURNAME') },
      { field: 'givenName', header: this.translate.instant('GIVENNAME') },
      { field: 'sections', header: this.translate.instant('editappointments.SECTIONS') },
      { field: 'isProfessional', header: this.translate.instant('editappointments.LEVEL') },
      { field: 'predictionId', header: this.translate.instant('editappointments.PREDICTION') },
      { field: 'resultId', header: this.translate.instant('editappointments.RESULTS')},
    ];

    this.createStepperMenu();
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      publicDetails: [null],
      internalDetails: [null],
      categoryId: [null, [Validators.required]],
      statusId: [null, [Validators.required]],
      emolumentId: [null, [Validators.required]],
      emolumentPatternId: [null],
      expectationId: [null],
    });
  }

  private mapParticipations(): void {
    this.participationTableItems = [];
    this.appointment.participations.forEach((element) => {
      this.participationTableItems.push(
        new ParticipationTableItem(
          element.person.id,
          element.person.givenName,
          element.person.surname,
          this.getSectionNames(element.musicianProfiles),
          element.musicianProfiles.map((mp) => mp.isProfessional).includes(true) ? 'Yes' : 'No',
          element.participation ? element.participation.predictionId : '',
          element.participation ? element.participation.resultId : ''
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

  mapVenueToSelectItem(venue: IVenueDto): SelectItem {
    return { label: `${venue.address.city} ${venue.address.urbanDistrict} | ${venue.name}`, value: venue.id };
  }

  mapMusicianProfileToSelectItem(musicianProfile: IMusicianProfileDto): SelectItem {
    return { label: musicianProfile.sectionName, value: musicianProfile.sectionName };
  }

  updateAppointment(appointment: IAppointmentDto, continueToNextStep: boolean): void {
    this.appointmentService.update(appointment).subscribe((_) => {
      this.toastService.success('Appointment updated');
      if (continueToNextStep) {
        this.appointment = appointment;
        this.fillForm();
        this.activeIndex = 1;
      } else {
        this.ref.close(appointment);
      }
    });
  }

  createAppointment(appointment: IAppointmentDto, continueToNextStep: boolean): void {
    this.appointmentService.create(appointment).subscribe((result) => {
      this.toastService.success('Appointment created');
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
        this.rooms = venue.rooms;
        return;
      }
      this.rooms = [];
    }
  }

  searchProject(event: any): void {
    this.projectOptions = this.projects.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) && !this.appointment.projects.map((r) => r.id).includes(p.id)
    );
  }

  searchSection(event: any): void {
    this.sectionOptions = this.sections.filter(
      (p) =>
        p.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) && !this.appointment.sections.map((r) => r.id).includes(p.id)
    );
  }

  searchRoom(event: any): void {
    this.roomOptions = this.rooms.filter(
      (p) => p.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()) && !this.appointment.rooms.map((r) => r.id).includes(p.id)
    );
  }

  onVenueChanged(event: any): void {
    this.appointmentService.setVenue(this.appointment.id, event.value).subscribe((_) => {
      this.toastService.success('Venue set');
      this.appointment.rooms.forEach((room) => {
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
    this.appointmentService.removeRoom(this.appointment.id, roomId).subscribe((_) => {
      if (showToast) {
        this.toastService.success('Room removed');
      }
    });
  }

  addRoom(roomId: string): void {
    this.appointmentService.addRoom(this.appointment.id, roomId).subscribe((_) => {
      this.toastService.success('Room added');
    });
  }

  removeSection(sectionId: string): void {
    this.appointmentService.removeSection(this.appointment.id, sectionId).subscribe((result) => {
      this.appointment = result;
      this.mapParticipations();
      this.toastService.success('Section removed');
    });
  }

  addSection(sectionId: string): void {
    this.appointmentService.addSection(this.appointment.id, sectionId).subscribe((result) => {
      this.appointment = result;
      this.mapParticipations();
      this.toastService.success('Section added');
    });
  }

  removeProject(projectId: string): void {
    this.appointmentService.removeProject(this.appointment.id, projectId).subscribe((result) => {
      this.appointment = result;
      this.mapParticipations();
      this.toastService.success('Project removed');
    });
  }

  addProject(projectId: string): void {
    this.appointmentService.addProject(this.appointment.id, projectId).subscribe((result) => {
      this.appointment = result;
      this.mapParticipations();
      this.toastService.success('Project added');
    });
  }

  getSectionNames(musicianProfiles: IMusicianProfileDto[]): string {
    return musicianProfiles.map((p) => p.sectionName).toString();
  }

  onTableFiltered(event: any): void {
    this.filteredDataCount = event.filteredValue.length;
  }

  onResultChanged(item: ParticipationTableItem, event: any): void {
    this.appointmentService.setResult(item.personId, this.appointment.id, event.value).subscribe((_) => {
      this.toastService.success('Result set');
    });
  }
}
