import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService } from '../../../core/services/me.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { MyAppointmentDto } from '../../../model/myAppointmentDto';
import { ProjectDto } from '../../../model/projectDto';
import { VenueDto } from '../../../model/venueDto';
import { RoomDto } from '../../../model/roomDto';

@Component({
  selector: 'arpa-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  userAppointments$: Observable<MyAppointmentDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  predictionOptions$: Observable<SelectItem[]> = of([]);
  itemsPerPage = 3;

  constructor(private meService: MeService, private route: ActivatedRoute, private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.predictionOptions$ = this.route.data.pipe(map((data) => data.predictions || []));
  }

  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getMyAppointments(take, skip);
    this.userAppointments$ = loadResult$.pipe(map((result) => result.userAppointments || []));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result.totalRecordsCount || 0));
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }

  getVenueTooltip(venue: VenueDto): string {
    if (!venue) {
      return '';
    }

    let tooltip = `<p><b>${venue.name}</b>`;
    if (venue.description) {
      tooltip += `<br/><small>${venue.description}</small>`;
    }
    tooltip += '</p>';
    if (venue.address) {
      if (venue.address.address1) {
        tooltip += `<p>${venue.address.address1}`;
      }
      if (venue.address.address2) {
        tooltip += `<br/>${venue.address.address2}</p>`;
      }
      tooltip += `<br/>${venue.address.zip} ${venue.address.city}`;
      if (venue.address.urbanDistrict) {
        tooltip += ` (${venue.address.urbanDistrict})`;
      }
      tooltip += '</p>';
    }
    return tooltip;
  }

  getRoomNames(rooms: RoomDto[]): string {
    return rooms.map((r) => r.name).join(', ');
  }

  onPredictionChanged(event: { value: string }, userAppointment: MyAppointmentDto): void {
    this.meService
      .setAppointmentPrediction(userAppointment.id, event.value)
      .pipe(first())
      .subscribe(() => this.notificationsService.success('myappointments.PREDICTION_SET'));
  }
}
