import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDialogComponent } from './audit-dialog.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuditLogService } from '../services/audit-log.service';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';

describe('AuditDialogComponent', () => {
  let component: AuditDialogComponent;
  let fixture: ComponentFixture<AuditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuditDialogComponent,
      ],
      imports: [
        TranslateMockModule,
      ],
      providers: [
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: { detail: {} },
          },
        },
        {
          provide: AuditLogService,
          useValue: {
            getTypeName: () => {
            },
          },
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
