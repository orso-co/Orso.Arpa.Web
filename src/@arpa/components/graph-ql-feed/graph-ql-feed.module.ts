import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphQlFeedComponent } from './graph-ql-feed.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [GraphQlFeedComponent],
  exports: [GraphQlFeedComponent],
})
export class GraphQlFeedModule {
}
