import { AppointmentStatus, ProjectDto, VenueDto, AppointmentDto, SectionDto, DateRange, AppointmentListDto } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AppointmentService } from '../services/appointment.service';
import { SectionService, NotificationsService, EnumService } from '@arpa/services';
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';

export interface CalendarEvent {
  id: string;
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
  classNames: string[];
}

@Component({
  selector: 'arpa-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
@Unsubscribe()
export class AppointmentsComponent {
  langChangeListener: Subscription;
  sectionsSubscription: Subscription;
  categoryOptions: SelectItem[] = [];
  statusOptions: SelectItem[] = [];
  statusSubscription: Subscription;
  salaryPatternOptions: SelectItem[] = [];
  salaryOptions: SelectItem[] = [];
  expectationOptions: SelectItem[] = [];
  sections: SectionDto[] = [];
  projects: ProjectDto[] = [];
  venues: VenueDto[] = [];
  predictionOptions: SelectItem[] = [];
  predictionSubscription: Subscription;
  resultOptions: SelectItem[] = [];
  resultSubscription: Subscription;
  status: AppointmentStatus;
  fullCalendarOptions$: Observable<any>;
  events: CalendarEvent[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private dialogService: DialogService,
    private sectionService: SectionService,
    private enumService: EnumService
  ) {
    this.route.data.pipe(first()).subscribe((data) => {
      this.projects = data.projects || [];
      this.venues = data.venues || [];
      this.salaryOptions = data.salaries || [];
      this.salaryPatternOptions = data.salaryPatterns || [];
      this.expectationOptions = data.expectations || [];
      this.categoryOptions = data.categories || [];
    });
    this.sectionsSubscription = this.sectionService.sectionsAll$.subscribe((sections) => (this.sections = sections || []));
    this.statusSubscription = this.enumService.getAppointmentStatusSelectItems().subscribe((items) => (this.statusOptions = items || []));
    this.resultSubscription = this.enumService
      .getAppointmentParticipationResultSelectItems()
      .subscribe((items) => (this.resultOptions = items || []));
    this.predictionSubscription = this.enumService
      .getAppointmentParticipationPredictionSelectItems()
      .subscribe((items) => (this.predictionOptions = items || []));
    this.langChangeListener = this.translate.onLangChange.subscribe(() => this.setOptions());
    this.setOptions();
  }

  private _appointments: AppointmentListDto[] = [];

  get appointments(): AppointmentListDto[] {
    return this._appointments;
  }

  set appointments(values: AppointmentListDto[]) {
    this._appointments = values;
    this.events = values.map((a) => this.mapAppointmentToCalendarEvent(a));
  }

  mapAppointmentToCalendarEvent(appointment: AppointmentListDto): CalendarEvent {
    const isAllDay = this.isAllDayEvent(appointment);

    /* fullCalendar multiple day all day events display one day short. This is an issue if an event
    /  spans several days but does not end at last day + 1 at 00:00 h but e.g. last day 20:00 - thus: add 1 day
    /  if end hours != 0
    / (see: https://stackoverflow.com/questions/27604359/fullcalendar-event-spanning-all-day-are-one-day-too-short)
    / workaround: add one day. */
    const endAdjusted = new Date(appointment.endTime);
    if (isAllDay && endAdjusted.getHours() !== 0) {
      endAdjusted.setDate(endAdjusted.getDate() + 1);
    }

    return {
      id: appointment.id,
      end: endAdjusted,
      start: new Date(appointment.startTime),
      title: appointment.city ? `${appointment.city}: ${appointment.name}` : appointment.name,
      allDay: isAllDay,
      classNames: [appointment.status ?? ''],
    };
  }

  isAllDayEvent(appointment: AppointmentListDto | undefined): boolean {
    if (appointment === undefined) {
      return false;
    }

    let isAllDay = false;
    const startT = new Date(appointment.startTime);
    const endT = new Date(appointment.endTime);

    if (endT.getHours() === 23 && endT.getMinutes() === 59 && startT.getHours() === 0) {
      isAllDay = true;
    }
    return isAllDay;
  }

  changeDates(oldEvent: CalendarEvent, changedEvent: CalendarEvent): void {
    let newStartTime: Date | null = null;
    let newEndTime: Date | null = null;
    if (oldEvent.start !== changedEvent.start) {
      newStartTime = changedEvent.start;
    }
    if (oldEvent.end !== changedEvent.end) {
      newEndTime = changedEvent.end;
    }
    if (newEndTime !== null || newStartTime !== null) {
      this.appointmentService.setDates(changedEvent.id, newStartTime, newEndTime).subscribe((appointment) => {
        const index = this.appointments.findIndex((a) => a.id === appointment.id);
        this.appointments[index] = appointment;
        this.appointments = [...this.appointments];
        this.notificationsService.success('Dates changed');
      });
    }
  }

  setAppointments(viewType: string, date: Date): void {
    this.appointmentService
      .get(this.getRange(viewType), date)
      .pipe(first())
      .subscribe((result) => (this.appointments = result));
  }

  getRange(viewName: string): DateRange {
    switch (viewName) {
      case 'dayGridMonth':
        return DateRange.MONTH;
      case 'timeGridWeek':
        return DateRange.WEEK;
      case 'timeGridDay':
        return DateRange.DAY;
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
          id: null,
          internalDetails: null,
          publicDetails: null,
          categoryId: null,
          expectationId: null,
          status: null,
          name: null,
          salaryPatternId: null,
          salaryId: null,
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
        salaryPatternOptions: this.salaryPatternOptions,
        salaryOptions: this.salaryOptions,
        expectationOptions: this.expectationOptions,
      },
      header: this.translate.instant('appointments.CREATE'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });

    ref.onClose.pipe(first()).subscribe((appointment: AppointmentDto) => {
      if (appointment) {
        this.appointments = [...this.appointments, appointment];
      }
    });
  }

  private setOptions(): void {
    this.fullCalendarOptions$ = this.translate.get('NEW').pipe(
      map((translation) => ({
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        calendarWeekends: true,
        defaultView: 'dayGridMonth',
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
          left: 'dayGridMonth,timeGridWeek,timeGridDay, prevYear,prev,next,nextYear, today',
          center: 'title',
          right: 'btnAddAppointment',
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

  private openEditDialog(appointmentId: string): void {
    this.appointmentService.getById(appointmentId, false).subscribe((appointment) => {
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
          salaryPatternOptions: this.salaryPatternOptions,
          salaryOptions: this.salaryOptions,
          expectationOptions: this.expectationOptions,
          isAllDayEvent: this.isAllDayEvent(appointment),
        },
        header: this.translate.instant('appointments.EDIT'),
        styleClass: 'form-modal',
        dismissableMask: true,
      });

      ref.onClose.pipe(first()).subscribe((result: AppointmentDto | string) => {
        if (result) {
          if (typeof result === 'string') {
            this.appointments.splice(
              this.appointments.findIndex((a) => a.id === appointmentId),
              1
            );
            this.appointments = [...this.appointments];
          } else {
            const index = this.appointments.findIndex((a) => a.id === result.id);
            this.appointments[index] = result;
            this.appointments = [...this.appointments];
          }
        }
      });
    });
  }
}
