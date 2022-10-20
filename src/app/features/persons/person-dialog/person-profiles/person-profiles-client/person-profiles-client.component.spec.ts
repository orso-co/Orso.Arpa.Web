import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonProfilesClientComponent } from './person-profiles-client.component';

describe('PersonProfilesClientComponent', () => {
  let component: PersonProfilesClientComponent;
  let fixture: ComponentFixture<PersonProfilesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonProfilesClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonProfilesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
