import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { CustomRegex } from '../../utils/CustomRegex';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder,
              private router: Router) {
    this.loginFormGroup = formBuilder.group({
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

  goToRegister(): void {
    this.router.navigate(['register']);
  }

}



