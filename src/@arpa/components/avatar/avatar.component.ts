import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MyUserProfileDto, PersonDto, UserDto } from '@arpa/models';
import { AuthService, PersonService } from '@arpa/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arpa-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private currentUserPersonId: string;

  @Input()
  user: UserDto | PersonDto | MyUserProfileDto | any;

  @Input()
  size = 'xxlarge';

  @Input()
  image = false;

  @Input()
  useCurrentUserAvatar = false;

  @Input()
  imageSize = 100;

  @Input()
  skipLoadingPicture = false;

  imageUrl: string;

  constructor(private authService: AuthService, private personService: PersonService) {}

  ngOnInit(): void {
    if (this.useCurrentUserAvatar) {
      this.subscription = this.authService.currentUser.subscribe((currentUser) => {
        this.currentUserPersonId = currentUser.personId ?? '';
        this.loadAvatar();
      });
    } else {
      this.loadAvatar();
    }
  }

  getColor() {
    const str = this.user?.displayName ? this.user?.displayName : (this.user?.givenName || '') + (this.user?.surname || '');
    return `hsl(${this.hashStr(str) % 360}, 28%, 50%)`;
  }

  loadAvatar() {
    this.imageUrl = 'assets/common/images/avatar.png';
    const potentialId = this.getPotentialPersonId();
    if (potentialId && !this.skipLoadingPicture) {
      this.personService.getProfilePicture(potentialId, this.imageSize).subscribe(
        (data) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const fileBase64 = e.target.result;
            this.setUrl(data.type, fileBase64);
          };
          reader.readAsBinaryString(data);
        },
        () => {
          // always fall back to no image to display; we should revisit this logic.
          this.image = false;
        }
      );
    } else {
      // always fall back to no image to display; we should revisit this logic.
      this.image = false;
    }
  }

  getInitials(): string {
    if (this.user?.displayName && this.user?.displayName.includes(' ')) {
      return `${this.user?.displayName
        .split(' ')
        .splice(0, 2)
        .map((name: string) => (name[0] ? name[0].toUpperCase() : ''))
        .join('')}`;
    } else {
      const [first] = this.user?.givenName || ' ';
      const [last] = this.user?.surname || ' ';
      return `${first[0].toUpperCase()}${last[0].toUpperCase()}`;
    }
  }

  private hashStr(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // eslint-disable-next-line no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private setUrl(dataType: string, fileBase64: string): void {
    this.imageUrl = `data:${dataType};base64,${btoa(fileBase64)}`;
  }

  /**
   * Because user is of type UserDto | PersonDto | MyUserProfileDto, it may not be possible
   * to retrieve the person id, so we'll try our luck.
   *
   * A proper refactor must be done here.
   */
  private getPotentialPersonId(): string {
    if (this.useCurrentUserAvatar) {
      return this.currentUserPersonId;
    }
    return this.user.personId || this.user?.person?.id || this.user?.id;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
