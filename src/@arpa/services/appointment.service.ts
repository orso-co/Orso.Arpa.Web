import {
  AppointmentCreateDto,
  AppointmentModifyBodyDto,
  AppointmentParticipationPrediction,
  AppointmentParticipationResult,
  DateRange,
  AppointmentDto,
  AppointmentListDto,
} from '@arpa/models';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@arpa/services';

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

  getById(id: string, includeParticipations: boolean): Observable<AppointmentDto> {
    const params = new HttpParams().set('includeParticipations', includeParticipations);
    return this.apiService.get<AppointmentDto>(`${this.baseUrl}/${id}`, params).pipe(shareReplay());
  }

  create(appointment: AppointmentCreateDto): Observable<AppointmentDto> {
    return this.apiService.post<AppointmentDto>(this.baseUrl, appointment);
  }

  update(appointment: AppointmentModifyBodyDto): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${appointment.id}`, appointment).pipe(shareReplay());
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}`).pipe(shareReplay());
  }

  removeRoom(id: string, roomId: string): Observable<any> {
    return this.apiService.delete(`${this.baseUrl}/${id}/rooms/${roomId}`).pipe(shareReplay());
  }

  addRoom(id: string, roomId: string): Observable<any> {
    return this.apiService.post(`${this.baseUrl}/${id}/rooms/${roomId}`).pipe(shareReplay());
  }

  removeSection(id: string, sectionId: string): Observable<AppointmentDto> {
    const params = new HttpParams().set('includeParticipations', false);
    return this.apiService.delete<AppointmentDto>(`${this.baseUrl}/${id}/sections/${sectionId}`, params).pipe(shareReplay());
  }

  addSection(id: string, sectionId: string): Observable<AppointmentDto> {
    const params = new HttpParams().set('includeParticipations', false);
    return this.apiService.post<AppointmentDto>(`${this.baseUrl}/${id}/sections/${sectionId}`, {}, params).pipe(shareReplay());
  }

  removeProject(id: string, projectId: string): Observable<AppointmentDto> {
    const params = new HttpParams().set('includeParticipations', false);
    return this.apiService.delete<AppointmentDto>(`${this.baseUrl}/${id}/projects/${projectId}`, params).pipe(shareReplay());
  }

  addProject(id: string, projectId: string): Observable<AppointmentDto> {
    const params = new HttpParams().set('includeParticipations', false);
    return this.apiService.post<AppointmentDto>(`${this.baseUrl}/${id}/projects/${projectId}`, {}, params).pipe(shareReplay());
  }

  setVenue(id: string, venueId: string | null): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${id}/venue/set/${venueId}`, {}).pipe(shareReplay());
  }

  setDates(id: string, startTime: Date | null, endTime: Date | null): Observable<AppointmentDto> {
    return this.apiService
      .put<AppointmentDto>(`${this.baseUrl}/${id}/dates/set`, {
        startTime,
        endTime,
      })
      .pipe(shareReplay());
  }

  setResult(personId: string, appointmentId: string, result: AppointmentParticipationResult): Observable<any> {
    return this.apiService.put(`${this.baseUrl}/${appointmentId}/participations/${personId}/result`, { result }).pipe(shareReplay());
  }

  setPrediction(personId: string, appointmentId: string, prediction: AppointmentParticipationPrediction): Observable<any> {
    return this.apiService
      .put(`${this.baseUrl}/${appointmentId}/participations/${personId}/prediction`, { prediction })
      .pipe(shareReplay());
  }

  sendNotification(appointmentId: string, forceSending = false) {
    const params = new HttpParams().set('forceSending', forceSending);
    return this.apiService.post(`${this.baseUrl}/${appointmentId}/notification`, {}, params).pipe(shareReplay());
  }

  downloadIcsFile(): void {
    this.apiService.getAsBlob('/appointments/export').subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'appointments.ics';
      document.body.appendChild(anchor);
      anchor.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    });
  }
}
