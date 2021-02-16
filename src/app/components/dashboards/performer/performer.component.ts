import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'arpa-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnDestroy {
private subs = new SubSink();

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
