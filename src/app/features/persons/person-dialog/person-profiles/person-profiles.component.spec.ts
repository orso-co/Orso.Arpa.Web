import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonProfilesComponent } from './person-profiles.component';

describe('PersonProfilesComponent', () => {
  let component: PersonProfilesComponent;
  let fixture: ComponentFixture<PersonProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
