import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegErrorComponent } from './reg-error.component';
import { TranslateMockModule } from '../../../testing/translate.mock.module';

describe('RegErrorComponent', () => {
  let component: RegErrorComponent;
  let fixture: ComponentFixture<RegErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegErrorComponent],
      imports: [
        TranslateMockModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
