import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CustomRegex } from '../../../utils/CustomRegex';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'arpa-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest = false;
  registerFormGroup: FormGroup;
  hide = true;
  script: any;
  captchaKey = environment.captcha.key;

  constructor(formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router,
              private renderer: Renderer2,
  ) {
    this.registerFormGroup = formBuilder.group({
      userName: [null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(256),
        ]
      ],
      givenName: [null,
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      surname: [null,
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      email: [null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.EMAIL),
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(CustomRegex.PASSWORD)
        ],
      ],
      privacyPolicy: [
        null,
        [
          Validators.required,
        ]
      ],
    });
  }

  ngOnInit(): void {
    this.script = this.renderer.createElement('script');
    this.script.defer = true;
    this.script.async = true;
    this.script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=initRecaptcha';
    this.renderer.appendChild(document.body, this.script);
  }

  onSubmit(): void {
    (window as any).grecaptcha.execute();
  }

  submit(): void {
    this.registerRequest = true;
    this.authService
      .register(Object.assign({}, this.registerFormGroup.value))
      .subscribe(() => {
        this.toastService.info('register.THANKS');
        this.router.navigate(['/onboarding/login']);
      });
    this.registerRequest = false;
  }

  onChange(): void {
    this.registerRequest = false;
  }

  goToLogin(): void {
    this.router.navigate(['/onboarding/login']);
  }

}
