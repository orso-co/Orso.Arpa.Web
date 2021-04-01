import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentComponent } from './edit-appointment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import {PrimeNgModule} from '../../../shared/prime-ng/prime-ng.module';
import {HttpLoaderFactory} from '../../../core/core.module';
import {AppointmentService} from '../../../core/services/appointment.service';
import {NotificationsService} from '../../../core/services/notifications.service';

describe('EditAppointmentComponent', () => {
  let component: EditAppointmentComponent;
  let fixture: ComponentFixture<EditAppointmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          PrimeNgModule,
          RouterTestingModule,
          NoopAnimationsModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
            deps: [HttpClient]
            }
          })
        ],
        declarations: [EditAppointmentComponent],
        providers: [
          { provide: DynamicDialogRef, useValue: {} },
          { provide: DynamicDialogConfig, useValue: { data: { appointment: { participations: [] }, venues: [] } } },
          { provide: NotificationsService, useValue: {} },
          { provide: AppointmentService, useValue: {} },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
