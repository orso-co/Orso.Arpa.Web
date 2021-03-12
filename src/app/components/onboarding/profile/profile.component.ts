import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'arpa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  router: Router;

  constructor() { }

  ngOnInit(): void {
  }
  goToDashboard(): void {
    this.router.navigate(['/pages/dashboard']);
    }
  }
