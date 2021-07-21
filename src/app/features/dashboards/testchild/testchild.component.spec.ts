import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestchildComponent } from './testchild.component';

describe('TestchildComponent', () => {
  let component: TestchildComponent;
  let fixture: ComponentFixture<TestchildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestchildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
