import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuproProfilesComponent } from './mupro-profiles.component';

describe('ProfileComponent', () => {
  let component: MuproProfilesComponent;
  let fixture: ComponentFixture<MuproProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuproProfilesComponent ]
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
