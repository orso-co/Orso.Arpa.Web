import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationComponent } from './activation.component';
import { TranslateMockModule } from '../../../testing/translate.mock.module';

describe('ActivationComponent', () => {
  let component: ActivationComponent;
  let fixture: ComponentFixture<ActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivationComponent],
      imports: [
        TranslateMockModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
