import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Observable, Subscription } from 'rxjs';
import { MyUserProfileDto } from '../../../@arpa/models/myUserProfileDto';
import { Unsubscribe } from '../../../@arpa/decorators/unsubscribe.decorator';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../@arpa/services/auth.service';

@Component({
  selector: 'arpa-appointments',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@Unsubscribe()
export class ProfileComponent implements OnInit {

  public selection: boolean;
  public profile: Observable<MyUserProfileDto>;
  private menuEventSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    this.menuEventSubscription = profileService.menuEvents.subscribe(() => {
      this.selection = true;
    });
  }

  ngOnInit(): void {
    this.profile = this.authService.currentUser.pipe(switchMap(token => {
      return this.route.data.pipe(map(({ profile }) => {
        profile.displayName = token.displayName;
        return profile as MyUserProfileDto;
      }));
    }));
  }

  return(event: Event) {
    this.selection = false;
    this.router.navigate(['.'], {
      relativeTo: this.route,
    });
    event.preventDefault();
  }
}
