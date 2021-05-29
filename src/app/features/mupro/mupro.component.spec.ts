import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuproComponent } from './mupro.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateMockModule } from '../../../testing/translate.mock.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MuproService } from './services/mupro.service';

describe('MuproComponent', () => {
  let component: MuproComponent;
  let fixture: ComponentFixture<MuproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuproComponent],
      imports: [
        RouterTestingModule,
        TranslateMockModule,
      ],
      providers: [
        { provide: MuproService, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
