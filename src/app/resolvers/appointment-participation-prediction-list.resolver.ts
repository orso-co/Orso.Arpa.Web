import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { SelectValueService } from '../services/select-value.service';

@Injectable()
export class AppointmentParticipationPredictionListResolver implements Resolve<SelectItem[]> {
  constructor(private selectValueService: SelectValueService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SelectItem[]> {
    return this.selectValueService.get('AppointmentParticipation', 'Prediction');
  }
}
