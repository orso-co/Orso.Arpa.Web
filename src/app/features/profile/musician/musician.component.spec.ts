import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianComponent } from './musician.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';

describe('MusicianComponent', () => {
  let component: MusicianComponent;
  let fixture: ComponentFixture<MusicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicianComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateMockModule,
      ],
      providers: [
        DialogService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
