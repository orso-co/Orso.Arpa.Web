import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup = this.formBuilder.group({
    email: [null,
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]
    ],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ],
    ],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  submit(): void {}


}



