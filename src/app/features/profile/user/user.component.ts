import { PersonDto } from '../../../../@arpa/models/personDto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { Subscription } from 'rxjs';
import { BankAccountDto } from '../../../../@arpa/models/bankAccountDto';

@Component({
  selector: 'arpa-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private personSubscription: Subscription = Subscription.EMPTY;
  public index = 0;
  displayName: string;
  email: string;
  person: PersonDto;
  bankAccounts: BankAccountDto;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.personSubscription = this.authService.currentUser
      .pipe(
        switchMap((token) => {
          return this.route.data.pipe(
            map(({ profile }) => {
              const { person, email } = profile;
              return { person, displayName: token.displayName, email };
            })
          );
        })
      )
      .subscribe(({ person, displayName, email }) => {
        this.displayName = displayName;
        this.email = email;
        this.person = { ...person, dateOfBirth: person.dateOfBirth ? new Date(person.dateOfBirth) : null };
      });
  }

  ngOnDestroy() {
    this.personSubscription.unsubscribe();
  }
}
