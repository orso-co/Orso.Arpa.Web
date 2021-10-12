import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsListComponent } from './contactdetails-list.component';

describe('ContactdetailsListComponent', () => {
  let component: ContactDetailsListComponent;
  let fixture: ComponentFixture<ContactDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
