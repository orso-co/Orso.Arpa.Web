import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  private calls = 0;

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff()),
    );
  }

  loadingOn(): void {
    this.calls++;
    this.loadingSubject.next(true);
  }

  loadingOff(): void {
    this.calls--;
    if (this.calls <= 0) {
      this.loadingSubject.next(false);
    }
  }

  reset(): void {
    this.calls = 0;
    this.loadingOff();
  }
}
