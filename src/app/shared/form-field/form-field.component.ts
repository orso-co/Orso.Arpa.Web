import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { errorTransitionAnimations } from './animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  animations: [errorTransitionAnimations],
})
export class FormFieldComponent implements OnInit {

  @Input() showErrors: boolean = true;
  @Input() label: string;
  @Input() type: string = 'input';
  @Input() customError: string;
  @ContentChild(FormControlName) formControl: FormControlName;
  @ContentChild(FormControlName, { read: ElementRef }) input: ElementRef;
  @ContentChild('footerTemplate', { static: false }) footerTemplateRef: TemplateRef<any>;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;


  constructor(private translate: TranslateService) {
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
          errorMessage = this.translate.instant('form.REQUIRED');
          break;
        case 'minlength':
          errorMessage = this.translate.instant('form.MIN_LENGTH', {
            ...this.formControl.errors[errorType],
          });
          break;
        default:
          if (this.customError) {
            errorMessage = this.translate.instant(this.customError);
          } else {
            errorMessage = this.translate.instant('form.GENERIC');
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
}
