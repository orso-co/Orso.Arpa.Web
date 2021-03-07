import { LoadingService } from '../../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProjectDto, IRoomDto, IUserAppointmentDto, IVenueDto } from 'src/app/models/appointment';
import { MeService } from 'src/app/services/me.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'arpa-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  userAppointments$: Observable<IUserAppointmentDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  predictionOptions$: Observable<SelectItem[]> = of([]);
  itemsPerPage = 3;

  constructor(
    private meService: MeService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit() {}

  loadData(take: number, skip: number) {
    this.predictionOptions$ = this.route.data.pipe(map((data) => data['predictions']));
    const loadResult$ = this.loadingService.showLoaderUntilCompleted(this.meService.getMyAppointments(take, skip));
    this.userAppointments$ = loadResult$.pipe(map((result) => result.userAppointments));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result.totalRecordsCount));
  }

  getProjectNames(projects: IProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }

  getVenueTooltip(venue: IVenueDto): string {
    if (!venue) {
      return '';
    }

    let tooltip = `<p><b>${venue.name}</b><br/><small>${venue.description}</small></p>`;
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

  getRoomNames(rooms: IRoomDto[]): string {
    return rooms.map((r) => r.name).join(', ');
  }

  onPredictionChanged(event: { value: string }, userAppointment: IUserAppointmentDto) {
    this.meService
      .setAppointmentPrediction(userAppointment.id, event.value)
      .subscribe((result) => this.toastService.success('Appointment participation prediction successfully set'));
  }
}
