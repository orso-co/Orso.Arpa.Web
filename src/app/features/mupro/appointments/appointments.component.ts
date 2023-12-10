import { MusicianProfileAppointmentParticipationDto } from '@arpa/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'arpa-mupro-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  columns: ColumnDefinition<MusicianProfileAppointmentParticipationDto>[] = [
    { label: 'APPOINTMENT', property: 'appointment.name', type: 'text' },
    { label: 'PREDICTION', property: 'appointmentParticipation.prediction', type: 'text', show: true },
    { label: 'RESULT', property: 'appointmentParticipation.result', type: 'text', show: true },
    { label: 'COMMENT_BY_PERFORMER', property: 'appointmentParticipation.commentByPerformerInner', type: 'text', show: true },
  ];

  personId: string | null;
  musicianProfileId: string | null;
  musicianProfileAppointments$: Observable<MusicianProfileAppointmentParticipationDto[]>;

  private paramSubscription: Subscription | undefined = Subscription.EMPTY;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.parent?.paramMap.subscribe((params) => {
      this.personId = params.get('personId');
      this.musicianProfileId = params.get('musicianProfileId');
    });

    this.musicianProfileAppointments$ = this.route.data.pipe<MusicianProfileAppointmentParticipationDto[]>(
      map((data) => data.musicianProfileAppointments)
    );
  }

  ngOnDestroy() {
    this.paramSubscription?.unsubscribe();
  }

  // TODO: Hier muss erst mal ein passender Dialog her. Der aktuell angegebene ist für Project Participations

  // openParticipationDialog(musicianProfileAppointment: MusicianProfileAppointmentParticipationDto) {
  //   const ref = this.dialogService.open(ParticipationDialogComponent, {
  //     data: { participation: musicianProfileAppointment.appointmentParticipation, personId: this.personId },
  //     header: this.translate.instant('mupro.EDIT_PARTICIPATION'),
  //     styleClass: 'form-modal',
  //     dismissableMask: true,
  //     width: window.innerWidth > 1000 ? '66%' : '100%',
  //   });

  //   ref.onClose.pipe(first()).subscribe(() => {
  //     this.muproService.getAppointmentParticipations(this.musicianProfileId!);
  //   });
  // }
}
