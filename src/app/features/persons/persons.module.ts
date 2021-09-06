import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonsService } from './../mupro/services/persons.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PersonsRoutingModule} from './persons-routing.module';


@NgModule({
  declarations: [
    PersonsListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PersonsRoutingModule,
    TranslateModule,
  ],
  exports: [
    PersonsListComponent,
  ],
  providers: [
    PersonsService
  ]
})
export class PersonsModule {
}
