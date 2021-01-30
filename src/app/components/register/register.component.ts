import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomRegex} from '../../utils/CustomRegex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder,
              private router: Router) {
    this.registerFormGroup = formBuilder.group({
      email: [null,
        [
          Validators.required,
          // todo: why not angular's built-in email validator Validators.email?
          Validators.pattern(CustomRegex.EMAIL)
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(CustomRegex.PASSWORD)
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  submit(): void {}

  goToLogin(): void {
    this.router.navigate(['login']);
  }

}
