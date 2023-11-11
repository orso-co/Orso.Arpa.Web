import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClubDto } from '../models/clubDto';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private baseUrl: string;
  loaded = false;
  private club$$ = new BehaviorSubject<ClubDto | undefined>(undefined);

  constructor(private apiService: ApiService) {
    this.baseUrl = '/club';
  }

  getClubData(): Observable<ClubDto | undefined> {
    if (this.loaded) {
      return this.club$$;
    }
    return this.apiService.get<ClubDto>(this.baseUrl).pipe(
      shareReplay(),
      tap((club) => this.club$$.next(club)),
      tap(() => (this.loaded = true))
    );
  }
}
