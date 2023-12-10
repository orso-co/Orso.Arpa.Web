import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressdataComponent } from './user-addressdata.component';

describe('UserAddressdataComponent', () => {
  let component: UserAddressdataComponent;
  let fixture: ComponentFixture<UserAddressdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddressdataComponent],
    });
    fixture = TestBed.createComponent(UserAddressdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
