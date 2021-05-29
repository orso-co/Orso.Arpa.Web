import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuproProfilesComponent } from './mupro-profiles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MuproService } from '../services/mupro.service';
import { ProfileService } from '../../profile/profile.service';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';
import { SharedModule } from '../../../shared/shared.module';
import { MuproDetailsComponent } from '../mupro-details/mupro-details.component';
import { CoreModule } from '../../../core/core.module';

describe('ProfileComponent', () => {
  let component: MuproProfilesComponent;
  let fixture: ComponentFixture<MuproProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuproProfilesComponent, MuproDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateMockModule,
        SharedModule,
        CoreModule,
      ],
      providers: [
        { provide: MuproService, useValue: {} },
        {
          provide: ProfileService, useValue: {
            menuEvents: {
              subscribe: () => {
              },
            },
          },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuproProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
