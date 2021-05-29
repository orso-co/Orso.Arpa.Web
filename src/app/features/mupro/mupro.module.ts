import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MuproComponent } from './mupro.component';
import { MuProRoutingModule } from './mupro-routing.module';
import { MuproDetailsComponent } from './mupro-details/mupro-details.component';
import { MuproCardComponent } from './mupro-card/mupro-card.component';
import { MuproProfilesComponent } from './mupro-profiles/mupro-profiles.component';
import { TranslateModule } from '@ngx-translate/core';
import { MuproService } from './services/mupro.service';


@NgModule({
  declarations: [MuproComponent, MuproDetailsComponent, MuproCardComponent, MuproProfilesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MuProRoutingModule,
    TranslateModule,
  ],
  providers: [
    MuproService
  ]
})
export class MuProModule {
}
