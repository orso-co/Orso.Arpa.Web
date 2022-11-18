import {
  AppointmentParticipationPrediction,
  AppointmentStatus,
  AppointmentParticipationResult,
  MusicianProfileInquiryStatus,
  ProjectInvitationStatus,
  ProjectParticipationStatusInner,
  ProjectParticipationStatusInternal,
  ProjectStatus,
} from '@arpa/models';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  constructor(private translate: TranslateService) {}

  getAppointmentParticipationPredictionSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(AppointmentParticipationPrediction);
    return this.translate
      .stream(values.map((val) => `appointmentParticipationPrediction.${val}`))
      .pipe(
        map((translatedValues) =>
          values.map((val) => ({ label: translatedValues[`appointmentParticipationPrediction.${val}`] || val, value: val }))
        )
      );
  }

  getAppointmentParticipationResultSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(AppointmentParticipationResult);
    return this.translate
      .stream(values.map((val) => `appointmentParticipationResult.${val}`))
      .pipe(
        map((translatedValues) =>
          values.map((val) => ({ label: translatedValues[`appointmentParticipationResult.${val}`] || val, value: val }))
        )
      );
  }

  getAppointmentStatusSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(AppointmentStatus);
    return this.translate
      .stream(values.map((val) => `appointmentStatus.${val}`))
      .pipe(map((translatedValues) => values.map((val) => ({ label: translatedValues[`appointmentStatus.${val}`] || val, value: val }))));
  }

  getMusicianProfileInquiryStatusSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(MusicianProfileInquiryStatus);
    return this.translate
      .stream(values.map((val) => `musicianProfileInquiryStatus.${val}`))
      .pipe(
        map((translatedValues) =>
          values.map((val) => ({ label: translatedValues[`musicianProfileInquiryStatus.${val}`] || val, value: val }))
        )
      );
  }

  getProjectInvitationStatusSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(ProjectInvitationStatus);
    return this.translate
      .stream(values.map((val) => `projectInvitationStatus.${val}`))
      .pipe(
        map((translatedValues) => values.map((val) => ({ label: translatedValues[`projectInvitationStatus.${val}`] || val, value: val })))
      );
  }

  getProjectParticipationStatusInnerSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(ProjectParticipationStatusInner);
    return this.translate
      .stream(values.map((val) => `projectParticipationStatusInner.${val}`))
      .pipe(
        map((translatedValues) =>
          values.map((val) => ({ label: translatedValues[`projectParticipationStatusInner.${val}`] || val, value: val }))
        )
      );
  }

  getProjectParticipationStatusInternalSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(ProjectParticipationStatusInternal);
    return this.translate
      .stream(values.map((val) => `projectParticipationStatusInternal.${val}`))
      .pipe(
        map((translatedValues) =>
          values.map((val) => ({ label: translatedValues[`projectParticipationStatusInternal.${val}`] || val, value: val }))
        )
      );
  }

  getProjecttatusSelectItems(): Observable<SelectItem[]> {
    const values = Object.values(ProjectStatus);
    return this.translate
      .stream(values.map((val) => `projectStatus.${val}`))
      .pipe(map((translatedValues) => values.map((val) => ({ label: translatedValues[`projectStatus.${val}`] || val, value: val }))));
  }
}
