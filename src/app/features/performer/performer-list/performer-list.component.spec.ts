import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateMockModule } from './../../../../testing/translate.mock.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerListComponent } from './performer-list.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonService } from '@arpa/services';

describe('PerformerListComponent', () => {
  let component: PerformerListComponent;
  let fixture: ComponentFixture<PerformerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateMockModule, HttpClientTestingModule],
      declarations: [PerformerListComponent],
      providers: [
        { provide: DialogService, useValue: {} },
        { provide: PersonService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
