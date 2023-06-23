import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeSwitcherService } from './theme-switcher.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  imports: [CommonModule, FormsModule, SelectButtonModule, InputSwitchModule, ToggleButtonModule],
  declarations: [ThemeSwitcherComponent],
  providers: [ThemeSwitcherService],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
