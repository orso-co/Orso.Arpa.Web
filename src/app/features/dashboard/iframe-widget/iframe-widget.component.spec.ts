import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeWidgetComponent } from './iframe-widget.component';

describe('IframeWidgetComponent', () => {
  let component: IframeWidgetComponent;
  let fixture: ComponentFixture<IframeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
