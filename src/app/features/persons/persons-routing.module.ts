import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsService } from './services/persons.service';
import { SectionsResolver } from '../profile/resolvers/sections.resolver';
import { PersonsListComponent } from './persons-list/persons-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonsListComponent,
    resolve: { persons: PersonsService },
    children: [
      {
        path: ':id',
        component: PersonsListComponent,
        resolve: {
          profiles: PersonsListComponent,
          sections: SectionsResolver,
        },

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
