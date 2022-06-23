import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBankdataComponent } from './person-bankdata.component';

describe('PersonBankdataComponent', () => {
  let component: PersonBankdataComponent;
  let fixture: ComponentFixture<PersonBankdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonBankdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBankdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
