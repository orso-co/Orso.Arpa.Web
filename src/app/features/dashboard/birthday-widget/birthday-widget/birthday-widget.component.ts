import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReducedPersonDto } from '@arpa/models';
import { Observable } from 'rxjs';
import { PersonsService } from 'src/app/features/mupro/services/persons.service';

@Component({
  selector: 'arpa-birthday-widget',
  templateUrl: './birthday-widget.component.html',
  styleUrls: ['./birthday-widget.component.scss'],
})
export class BirthdayWidgetComponent implements OnInit {
  birthdayChildren$: Observable<ReducedPersonDto[]>;

  constructor(private personsService: PersonsService, private router: Router) {}

  ngOnInit(): void {
    this.birthdayChildren$ = this.personsService.getBirthdayChildren();
  }

  openPersonDialog(personId: string) {
    this.router.navigate(['/arpa', 'persons', { outlets: { modal: ['detail', personId] } }]);
  }
}
