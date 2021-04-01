import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MyAppointmentsComponent } from './my-appointments.component';
import { MeService } from '../../../core/services/me.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { LoadingService } from '../../../core/services/loading.service';
import { SelectValueService } from '../../../core/services/select-value.service';
import { httpLoaderFactory } from '../../../core/core.module';

describe('MyAppointmentsComponent', () => {
  let component: MyAppointmentsComponent;
  let fixture: ComponentFixture<MyAppointmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyAppointmentsComponent],
      providers: [
        { provide: MeService, useValue: {} },
        { provide: NotificationsService, useValue: {} },
        { provide: LoadingService, useValue: {} },
        { provide: SelectValueService, useValue: {} },
        { provide: ActivatedRoute, useValue: { data: of({}) } },
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
