import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformerListComponent } from './performer-list/performer-list.component';

const routes: Routes = [
  {
    path: '',
    component: PerformerListComponent,
    children: [
      {
        path: 'detail',
        outlet: 'modal',
        loadChildren: () => import('../persons/person-dialog/person-dialog.module').then(m => m.PersonDialogModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformersRoutingModule {
}
