import { Component, Input, OnInit } from '@angular/core';
import { IUserDto } from '../../models/IUserDto';

@Component({
  selector: 'arpa-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  @Input()
  user: IUserDto | null;

  @Input()
  image: boolean = false;

  constructor() {
  }

  private hashStr(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  getColor() {
    return `hsl(${this.hashStr(this.user?.displayName || this.user?.userName || '') % 360}, 28%, 50%)`;
  }

  getImage() {
    return this.image ? 'assets/common/images/einstein_placeholder.jpg' : '';
  }

  getInitials(): string {
    return `${this.user?.displayName
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('')}`;
  }

  ngOnInit(): void {

  }

}
