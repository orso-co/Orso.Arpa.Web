import { DialogService } from 'primeng/dynamicdialog';
import { TranslateMockModule } from './../../../../testing/translate.mock.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsWidgetComponent } from './appointments-widget.component';

describe('AppointmentsWidgetComponent', () => {
  let component: AppointmentsWidgetComponent;
  let fixture: ComponentFixture<AppointmentsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateMockModule,
      ],
      declarations: [AppointmentsWidgetComponent],
      providers: [
        { provide: DialogService, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
