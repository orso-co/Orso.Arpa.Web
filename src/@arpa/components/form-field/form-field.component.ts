import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControlName } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { errorTransitionAnimations } from './animations';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arpa-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  animations: [errorTransitionAnimations],
})
export class FormFieldComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'form-field-appearance-outline';
  @HostBinding('class.focus') hasFocus: boolean = false;
  @HostBinding('class.error') hasError: boolean = false;
  @HostBinding('class.state') hasState: boolean = false;

  @Input() showErrors: boolean = true;
  @Input() label: string;
  @Input() type: string = 'input';
  @Input() customError: string;
  @ContentChild(FormControlName) formControl: FormControlName;
  @ContentChild(FormControlName, { read: ElementRef }) input: ElementRef;
  @ContentChild('footerTemplate', { static: false }) footerTemplateRef: TemplateRef<any>;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  private focusListener: () => void;
  private focusOutListener: () => void;
  private valueChangeSubscription: Subscription | undefined;


  constructor(private renderer: Renderer2,
              private cdref: ChangeDetectorRef,
              private translate: TranslateService,
              private autofillMonitor: AutofillMonitor,
  ) {
  }

  get hasErrors(): boolean {
    return !!(this.formControl.touched && !this.formControl.valid && this.formControl.errors);
  }

  get errorMessage(): string | void {
    if (this.formControl.errors) {
      const errorType: string = Object.keys(this.formControl.errors)[0];
      let errorMessage = '';
      switch (errorType) {
        case 'required':
          errorMessage = this.translate.instant('REQUIRED');
          break;
        case 'minlength':
          errorMessage = this.translate.instant('MIN_LENGTH', {
            ...this.formControl.errors[errorType],
          });
          break;
        default:
          if (this.customError) {
            errorMessage = this.translate.instant(this.customError);
          } else {
            errorMessage = this.translate.instant('GENERIC');
          }
      }
      return errorMessage;
    }
  }

  ngOnInit(): void {
    if (this.type === 'field') {
      this.wrapper.nativeElement.className = 'p-field';
    } else if (this.type === 'checkbox') {
      this.wrapper.nativeElement.className = 'p-field p-field-checkbox';
    } else {
      this.wrapper.nativeElement.className = 'p-field p-float-label';
    }
  }

  ngAfterViewInit() {
    if (this.formControl) {
      // Initial states.
      setTimeout(() => {
        this.hasState = !!this.formControl.value;
      }, 0);

      this.valueChangeSubscription = this.formControl.valueChanges?.pipe().subscribe(() => {
        this.hasError = this.hasErrors;
        this.hasState = !!this.formControl.value;
      });
    }
    if (this.input) {
      // Detect autofill animations.
      this.autofillMonitor.monitor(this.input)
        .subscribe(e => {
            this.hasState = e.isAutofilled;
          },
        );

      this.focusListener = this.renderer.listen(this.input.nativeElement, 'focusin', (e) => {
        this.hasError = this.hasErrors;
        this.hasFocus = true;
      });

      this.focusOutListener = this.renderer.listen(this.input.nativeElement, 'focusout', () => {
        this.hasError = this.hasErrors;
        this.hasFocus = false;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.focusListener) {
      this.focusListener();
      this.focusOutListener();
    }
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
    if (this.input) {
      this.autofillMonitor.stopMonitoring(this.input);
    }
  }
}
