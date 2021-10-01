import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';
import { Subscription } from 'rxjs';
import { MyUserProfileDto } from '../../model/myUserProfileDto';

@Component({
  selector: 'arpa-appointments',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@Unsubscribe()
export class ProfileComponent implements OnInit {

  public selection: boolean;
  public profile: MyUserProfileDto;
  private menuEventSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {
    this.menuEventSubscription = profileService.menuEvents.subscribe(() => {
      this.selection = true;
    });
  }

  ngOnInit(): void {
    this.profile = this.route.snapshot.data.profile;
  }

  return(event: Event) {
    this.selection = false;
    this.router.navigate(['.'], {
      relativeTo: this.route,
    });
    event.preventDefault();
  }
}
