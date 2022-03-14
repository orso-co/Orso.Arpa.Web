import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerListComponent } from './performer-list.component';

describe('PerformerListComponent', () => {
  let component: PerformerListComponent;
  let fixture: ComponentFixture<PerformerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
