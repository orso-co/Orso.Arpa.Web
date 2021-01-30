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
      userName: [null,
        [
          Validators.required,
          Validators.minLength(1),
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
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



