import { ContactDetailsListComponent } from './contactdetails-list/contactdetails-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactDetailsListComponent,

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactDetailsRoutingModule {
}
