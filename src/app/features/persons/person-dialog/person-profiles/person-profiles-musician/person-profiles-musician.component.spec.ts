import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonProfilesMusicianComponent } from './person-profiles-musician.component';

describe('PersonProfilesMusicianComponent', () => {
  let component: PersonProfilesMusicianComponent;
  let fixture: ComponentFixture<PersonProfilesMusicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonProfilesMusicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonProfilesMusicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
