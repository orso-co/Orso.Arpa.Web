import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../models/api-url';
import { IAppointmentDto } from '../models/appointment';
import { DateRange } from '../models/date-range';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/appointments`;
  }

  get(range: DateRange, date: Date): Observable<IAppointmentDto[]> {
    const params = new HttpParams().set('date', date.toISOString()).set('range', DateRange[range]);

    return this.http.get<IAppointmentDto[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<IAppointmentDto> {
    return this.http.get<IAppointmentDto>(`${this.baseUrl}/${id}`);
  }

  create(appointment: IAppointmentDto): Observable<IAppointmentDto> {
    return this.http.post<IAppointmentDto>(this.baseUrl, appointment);
  }

  update(appointment: IAppointmentDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointment.id}`, appointment).pipe(shareReplay());
  }

  removeRoom(id: string, roomId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/rooms/${roomId}`).pipe(shareReplay());
  }

  addRoom(id: string, roomId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/rooms/${roomId}`, {}).pipe(shareReplay());
  }

  removeSection(id: string, sectionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/sections/${sectionId}`).pipe(shareReplay());
  }

  addSection(id: string, sectionId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/sections/${sectionId}`, {}).pipe(shareReplay());
  }

  removeProject(id: string, projectId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/projects/${projectId}`).pipe(shareReplay());
  }

  addProject(id: string, projectId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/projects/${projectId}`, {}).pipe(shareReplay());
  }

  setVenue(id: string, venueId: string | null): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/venue/set/${venueId}`, {}).pipe(shareReplay());
  }

  setDates(id: string, startTime: Date | null, endTime: Date | null): Observable<any> {
    return this.http
      .put<IAppointmentDto[]>(`${this.baseUrl}/${id}/dates/set`, { startTime, endTime })
      .pipe(shareReplay());
  }

  setResult(personId: string, appointmentId: string, resultId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appointmentId}/participations/${personId}/result/${resultId}`, {}).pipe(shareReplay());
  }
}
