import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDialogComponent } from './news-dialog.component';

describe('NewsDialogComponent', () => {
  let component: NewsDialogComponent;
  let fixture: ComponentFixture<NewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
