import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule as PrimeAvatar } from 'primeng/avatar';
import { AvatarComponent } from './avatar.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeAvatar,
  ],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class AvatarModule {
}
