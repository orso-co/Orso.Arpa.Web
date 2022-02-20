import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrettyJsonPipe } from './pretty-json.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PrettyJsonPipe],
  exports: [PrettyJsonPipe],
})
export class PrettyJsonModule {}
