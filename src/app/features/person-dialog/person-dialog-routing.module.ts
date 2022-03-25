import { PersonDialogEntryComponent } from './person-dialog-entry/person-dialog-entry.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonResolver } from './resolvers/person.resolver';

const routes: Routes = [
  {
    path: ':personId',
    component: PersonDialogEntryComponent,
    resolve: {
      person: PersonResolver,
    },
  },
  {
    path: '',
    component: PersonDialogEntryComponent,
    resolve: {
      person: PersonResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDialogRoutingModule {}
