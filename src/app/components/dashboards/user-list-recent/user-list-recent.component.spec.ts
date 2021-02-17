import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListRecentComponent } from './user-list-recent.component';

describe('UserListRecentComponent', () => {
  let component: UserListRecentComponent;
  let fixture: ComponentFixture<UserListRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListRecentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
