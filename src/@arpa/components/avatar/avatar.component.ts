import { Component, Input } from '@angular/core';

@Component({
  selector: 'arpa-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

  @Input()
  user: any;

  @Input()
  size = 'xxlarge';

  @Input()
  image = false;

  constructor() {
  }

  getColor() {
    const str = this.user?.displayName ? this.user?.displayName :
      (this.user?.givenName || '') + (this.user?.surname || '');
    return `hsl(${this.hashStr(str) % 360}, 28%, 50%)`;
  }

  getImage() {
    return this.image ? 'assets/common/images/avatar.png' : '';
  }

  getInitials(): string {
    if (this.user?.displayName) {
      return `${this.user?.displayName
        .split(' ')
        .map((name: string) => name[0].toUpperCase())
        .join('').toUpperCase()}`;
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

}
