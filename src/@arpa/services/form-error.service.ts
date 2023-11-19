import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  handleError(formGroup: FormGroup, error: any) {
    if (error.status < 500 && error.errors) {
      Object.keys(error.errors).forEach((prop) => {
        const formProp = prop[0].toLowerCase() + prop.slice(1);
        const formControl = formGroup.get(formProp);
        if (formControl) {
          formControl.setErrors({
            resultError: error.errors[prop],
          });
          formControl.markAsTouched();
        }
      });
    }
  }
}
