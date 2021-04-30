import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuproDetailsComponent } from './mupro-details.component';

describe('DetailsComponent', () => {
  let component: MuproDetailsComponent;
  let fixture: ComponentFixture<MuproDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuproDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuproDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
