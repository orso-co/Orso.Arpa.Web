import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutComponent } from './page-layout.component';
import {ActivatedRoute} from '@angular/router';

describe('PageLayoutComponent', () => {
  let component: PageLayoutComponent;
  let fixture: ComponentFixture<PageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLayoutComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
