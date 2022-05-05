import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeWidgetProjectstatsComponent } from './iframe-widget-projectstats.component';

describe('IframeWidgetProjectstatsComponent', () => {
  let component: IframeWidgetProjectstatsComponent;
  let fixture: ComponentFixture<IframeWidgetProjectstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeWidgetProjectstatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeWidgetProjectstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
