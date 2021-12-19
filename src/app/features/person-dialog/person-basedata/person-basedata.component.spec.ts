import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBasedataComponent } from './person-basedata.component';

describe('PersonBasedataComponent', () => {
  let component: PersonBasedataComponent;
  let fixture: ComponentFixture<PersonBasedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonBasedataComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBasedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
