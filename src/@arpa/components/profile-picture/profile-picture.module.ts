import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule as PrimeAvatar } from 'primeng/avatar';
import { ProfilePictureComponent } from './profile-picture.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from 'src/@arpa/translate';

@NgModule({
  imports: [
    CommonModule,
    PrimeAvatar,
    FileUploadModule,
    ButtonModule,
    // we're loading profile here; it can be changed to something else.
    TranslateModule.forChild(['profile']),
  ],
  declarations: [ProfilePictureComponent],
  exports: [ProfilePictureComponent],
})
export class ProfilePictureModule {}
