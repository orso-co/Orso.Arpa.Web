import { AppointmentParticipationDto } from '@arpa/models';
import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';

@Injectable({
  providedIn: 'root',
})
export class AppointmentParticipationsService {
  private readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/profiles/musicians';
  }

  getByProjectId(projectId: string, musicianId: string): Observable<any> {
    return this.apiService.get<AppointmentParticipationDto>(`${this.baseUrl}/${musicianId}/appointmentparticipations?projectId=${projectId}`).pipe(shareReplay());
  }

}
