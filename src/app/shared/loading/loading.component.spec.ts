import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { LoadingService } from '../../core/services/loading.service';
import { of } from 'rxjs';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingComponent],
        providers: [{
          provide: LoadingService, useValue: {
            loading$: of(),
          },
        }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
