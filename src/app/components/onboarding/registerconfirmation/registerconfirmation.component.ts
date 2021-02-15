import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'arpa-registerconfirmation',
  templateUrl: './registerconfirmation.component.html',
  styleUrls: ['./registerconfirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin(): void {
    this.router.navigate(['/onboarding/login']);
  }

}
