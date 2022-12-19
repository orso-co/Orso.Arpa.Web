import { AppointmentParticipationPrediction } from './../../../../@arpa/models/appointmentParticipationPrediction';
import { AppointmentParticipationResult } from './../../../../@arpa/models/appointmentParticipationResult';
import { shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../@arpa/services/api.service';
import { AppointmentDto } from '../../../../@arpa/models/appointmentDto';
import { DateRange } from '../../../../@arpa/models/dateRange';
import { AppointmentListDto } from 'src/@arpa/models/appointmentListDto';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly baseUrl: string;

  constructor(private apiService: ApiService) {
    this.baseUrl = '/appointments';
  }

  get(range: DateRange, date: Date): Observable<AppointmentListDto[]> {
    const params = new HttpParams().set('date', date.toISOString()).set('range', range);

    return this.apiService.get<AppointmentListDto[]>(this.baseUrl, params).pipe(shareReplay());
  }

  getById(id: string): Observable<AppointmentDto> {
    return this.apiService.get<AppointmentDto>(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  create(appointment: AppointmentDto): Observable<AppointmentDto> {
    return this.apiService.post<AppointmentDto>(this.baseUrl, appointment);
  }

  update(appointment: AppointmentDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${appointment.id}`, appointment).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  removeRoom(id: string, roomId: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}/rooms/${roomId}`).pipe(shareReplay());
  }

  addRoom(id: string, roomId: string): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/${id}/rooms/${roomId}`, {}).pipe(shareReplay());
  }

  removeSection(id: string, sectionId: string): Observable<AppointmentDto> {
    return this.apiService.delete<AppointmentDto>(`${this.baseUrl}/${id}/sections/${sectionId}`).pipe(shareReplay());
  }

  addSection(id: string, sectionId: string): Observable<AppointmentDto> {
    return this.apiService.post<AppointmentDto>(`${this.baseUrl}/${id}/sections/${sectionId}`, {}).pipe(shareReplay());
  }

  removeProject(id: string, projectId: string): Observable<AppointmentDto> {
    return this.apiService.delete<AppointmentDto>(`${this.baseUrl}/${id}/projects/${projectId}`).pipe(shareReplay());
  }

  addProject(id: string, projectId: string): Observable<AppointmentDto> {
    return this.apiService.post<AppointmentDto>(`${this.baseUrl}/${id}/projects/${projectId}`, {}).pipe(shareReplay());
  }

  setVenue(id: string, venueId: string | null): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}/venue/set/${venueId}`, {}).pipe(shareReplay());
  }

  setDates(id: string, startTime: Date | null, endTime: Date | null): Observable<AppointmentDto> {
    return this.apiService.put<AppointmentDto>(`${this.baseUrl}/${id}/dates/set`, { startTime, endTime }).pipe(shareReplay());
  }

  setResult(personId: string, appointmentId: string, result: AppointmentParticipationResult): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${appointmentId}/participations/${personId}/result`, { result }).pipe(shareReplay());
  }
}
