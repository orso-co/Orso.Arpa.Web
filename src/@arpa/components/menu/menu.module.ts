import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MenuModule as PrimeMenuModule } from 'primeng/menu';

@NgModule({
  imports: [
    CommonModule,
    PrimeMenuModule,
  ],
  declarations: [MenuComponent],
  providers: [MenuService],
  exports: [MenuComponent],
})
export class MenuModule {
}
