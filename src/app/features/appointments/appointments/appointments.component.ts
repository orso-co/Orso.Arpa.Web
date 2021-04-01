import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IAppointmentDto, ICalendarEvent, IProjectDto, IVenueDto } from 'src/app/models/appointment';
import { DateRange } from 'src/app/models/date-range';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ISectionDto } from 'src/app/models/section';
import {AppointmentService} from '../../../core/services/appointment.service';
import {NotificationsService} from '../../../core/services/notifications.service';
import {LoadingService} from '../../../core/services/loading.service';
import {SectionService} from '../../../core/services/section.service';
import {EditAppointmentComponent} from '../edit-appointment/edit-appointment.component';

@Component({
  selector: 'arpa-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnDestroy {
  categoryOptions: SelectItem[] = [];
  statusOptions: SelectItem[] = [];
  emolumentPatternOptions: SelectItem[] = [];
  emolumentOptions: SelectItem[] = [];
  expectationOptions: SelectItem[] = [];
  sections: ISectionDto[] = [];
  projects: IProjectDto[] = [];
  venues: IVenueDto[] = [];
  predictionOptions: SelectItem[] = [];
  resultOptions: SelectItem[] = [];

  fullCalendarOptions$: Observable<any>;
  private _appointments: IAppointmentDto[] = [];
  events: ICalendarEvent[] = [];
  private subs = new SubSink();

  get appointments(): IAppointmentDto[] {
    return this._appointments;
  }

  set appointments(values: IAppointmentDto[]) {
    this._appointments = values;
    this.events = values.map((a) => this.mapAppointmentToCalendarEvent(a));
  }

  constructor(
    private appointmentService: AppointmentService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private sectionService: SectionService
  ) {
    this.subs.add(
      this.route.data.subscribe((data) => {
        this.projects = data.projects || [];
        this.venues = data.venues || [];
        this.emolumentOptions = data.emoluments || [];
        this.emolumentPatternOptions = data.emolumentPatterns || [];
        this.expectationOptions = data.expectations || [];
        this.categoryOptions = data.categories || [];
        this.statusOptions = data.status || [];
        this.predictionOptions = data.predictions || [];
        this.resultOptions = data.results || [];
      })
    );
    this.subs.add(this.sectionService.sections$.subscribe((sections) => (this.sections = sections || [])));
    this.setOptions();
    this.translate.onLangChange.subscribe(() => this.setOptions());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private setOptions(): void {
    this.fullCalendarOptions$ = this.translate.get('NEW').pipe(
      map((translation) => ({
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        calendarWeekends: true,
        defaultView: 'timeGridWeek',
        defaultDate: new Date(),
        eventResize: (e: any) => {
          this.changeDates(e.prevEvent, e.event);
        },
        eventDrop: (e: any) => {
          this.changeDates(e.oldEvent, e.event);
        },
        dateClick: (e: { date: Date }) => {
          this.openCreateDialog(e.date);
        },
        eventClick: (e: any) => {
          this.openEditDialog(e.event.id);
        },
        customButtons: {
          btnAddAppointment: {
            text: translation,
            click: () => {
              this.openCreateDialog();
            },
          },
        },
        header: {
          left: 'prevYear,prev,next,nextYear today',
          center: 'title',
          right: 'btnAddAppointment dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: true,
        locale: this.translate.currentLang,
        firstDay: 1,
        weekNumberCalculation: 'ISO',
        weekNumbers: true,
        weekNumbersWithinDays: true,
        nowIndicator: true,
        eventLimit: true,
        datesRender: (info: any) => {
          this.setAppointments(info.view.type, info.view.calendar.component.props.currentDate);
        },
      }))
    );
  }

  mapAppointmentToCalendarEvent(appointment: IAppointmentDto): ICalendarEvent {
    // let allDay = false;
    // if(new Date(appointment.endTime).getHours() - new Date(appointment.startTime).getHours() <= 7) allDay = true;
     return {
      id: appointment.id,
      end: new Date(appointment.endTime),
      start: new Date(appointment.startTime),
      title: appointment.name,
      // allDay: appointment.allDay,
      allDay: false,
    };
  }

  changeDates(oldEvent: ICalendarEvent, changedEvent: ICalendarEvent): void {
    let newStartTime: Date | null = null;
    let newEndTime: Date | null = null;
    if (oldEvent.start !== changedEvent.start) {
      newStartTime = changedEvent.start;
    }
    if (oldEvent.end !== changedEvent.end) {
      newEndTime = changedEvent.end;
    }
    if (newEndTime !== null || newStartTime !== null) {
      this.subs.add(
        this.loadingService
          .showLoaderUntilCompleted(this.appointmentService.setDates(changedEvent.id, newStartTime, newEndTime))
          .subscribe((appointment) => {
            const index = this.appointments.findIndex((a) => a.id === appointment.id);
            this.appointments[index] = appointment;
            this.appointments = [...this.appointments];
            this.notificationsService.success('Dates changed');
          })
      );
    }
  }

  setAppointments(viewType: string, date: Date): void {
    this.subs.add(
      this.loadingService
        .showLoaderUntilCompleted(this.appointmentService.get(this.getRange(viewType), date))
        .subscribe((result) => (this.appointments = result))
    );
  }

  getRange(viewName: string): DateRange {
    switch (viewName) {
      case 'dayGridMonth':
        return DateRange.Month;
      case 'timeGridWeek':
        return DateRange.Week;
      case 'timeGridDay':
        return DateRange.Day;
      default:
        throw Error('not supported');
    }
  }

  openCreateDialog(date?: Date): void {
    const appointmentDate = date || new Date();
    const ref = this.dialogService.open(EditAppointmentComponent, {
      data: {
        appointment: {
          startTime: appointmentDate,
          endTime: appointmentDate,
          // allDay:false,
          id: null,
          internalDetails: null,
          publicDetails: null,
          categoryId: null,
          expectationId: null,
          statusId: null,
          name: null,
          emolumentPatternId: null,
          emolumentId: null,
          rooms: [],
          participations: [],
          projects: [],
          sections: [],
          createdBy: null,
          createdAt: null,
          modifiedAt: null,
          modifiedBy: null,
          venueId: null,
        },
        sections: this.sections,
        projects: this.projects,
        venues: this.venues,
        predictionOptions: this.predictionOptions,
        resultOptions: this.resultOptions,
        categoryOptions: this.categoryOptions,
        statusOptions: this.statusOptions,
        emolumentPatternOptions: this.emolumentPatternOptions,
        emolumentOptions: this.emolumentOptions,
        expectationOptions: this.expectationOptions,
      },
      header: this.translate.instant('editappointments.CREATE'),
      style: { 'max-width': '1500px' },
      dismissableMask: true
    });

    this.subs.add(
      ref.onClose.subscribe((appointment: IAppointmentDto) => {
        if (appointment) {
          this.appointments = [...this.appointments, appointment];
        }
      })
    );
  }

  private openEditDialog(appointmentId: string): void {
    const appointment = this.appointments.find((a) => a.id === appointmentId);
    const ref = this.dialogService.open(EditAppointmentComponent, {
      data: {
        appointment,
        sections: this.sections,
        projects: this.projects,
        venues: this.venues,
        predictionOptions: this.predictionOptions,
        resultOptions: this.resultOptions,
        categoryOptions: this.categoryOptions,
        statusOptions: this.statusOptions,
        emolumentPatternOptions: this.emolumentPatternOptions,
        emolumentOptions: this.emolumentOptions,
        expectationOptions: this.expectationOptions,
      },
      header: this.translate.instant('editappointments.EDIT'),
      style: { 'max-width': '1500px' },
      dismissableMask: true,
    });

    this.subs.add(
      ref.onClose.subscribe((result: IAppointmentDto | string) => {
        if (result) {
          if (typeof result === 'string') {
            this.appointments.splice(this.appointments.findIndex(a => a.id === appointmentId), 1);
            this.appointments = [...this.appointments];
          } else {
            const index = this.appointments.findIndex((a) => a.id === result.id);
            this.appointments[index] = result;
            this.appointments = [...this.appointments];
          }
        }
      })
    );
  }
}
