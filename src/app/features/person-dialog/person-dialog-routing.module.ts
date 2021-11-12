import { PersonDialogEntryComponent } from './person-dialog-entry/person-dialog-entry.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    component: PersonDialogEntryComponent,
    resolve: {

    },
  },
  {
    path: 'me/:profileId',
    component: PersonDialogEntryComponent,
    resolve: {

    },
  },
  {
    path: ':personId/:profileId',
    component: PersonDialogEntryComponent,
    resolve: {

    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDialogRoutingModule {
}
