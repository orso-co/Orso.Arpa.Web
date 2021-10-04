import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LangSwitchComponent } from './lang-switch.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
  ],
  declarations: [LangSwitchComponent],
  exports: [LangSwitchComponent],
})
export class LangSwitchModule {
}
