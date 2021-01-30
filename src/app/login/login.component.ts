import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.loginFormGroup = formBuilder.group({
      userName: [null,
        [
          Validators.required,
          Validators.minLength(1)
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6)
        ],
      ],
    });
  }

  ngOnInit(): void {
  }

  submit(): void {}


}



