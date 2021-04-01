import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IVenueDto } from '../models/appointment';
import {VenueService} from '../core/services/venue.service';

@Injectable()
export class VenueListResolver implements Resolve<IVenueDto[]> {
  constructor(private venueService: VenueService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVenueDto[]> {
    return this.venueService.load();
  }
}
