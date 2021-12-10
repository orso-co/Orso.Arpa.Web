import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonContactdataComponent } from './person-contactdata.component';

describe('PersonContactdataComponent', () => {
  let component: PersonContactdataComponent;
  let fixture: ComponentFixture<PersonContactdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonContactdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonContactdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
