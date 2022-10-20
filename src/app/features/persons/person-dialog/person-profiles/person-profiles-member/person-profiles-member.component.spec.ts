import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonProfilesMemberComponent } from './person-profiles-member.component';

describe('PersonProfilesMemberComponent', () => {
  let component: PersonProfilesMemberComponent;
  let fixture: ComponentFixture<PersonProfilesMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonProfilesMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonProfilesMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
