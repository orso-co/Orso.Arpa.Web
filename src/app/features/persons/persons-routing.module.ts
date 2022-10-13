import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
    children: [
      {
        path: 'detail',
        outlet: 'modal',
        loadChildren: () => import('./person-dialog/person-dialog.module').then(m => m.PersonDialogModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {
}
