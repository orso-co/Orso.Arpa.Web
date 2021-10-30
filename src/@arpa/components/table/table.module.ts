import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArpaTableColumnDirective, TableComponent } from './table.component';
import { TableModule as NgTableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '../../translate';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StateBadgeModule } from '../status-badge/state-badge.module';


@NgModule({
  declarations: [
    TableComponent,
    ArpaTableColumnDirective,
  ],
  imports: [
    CommonModule,
    StateBadgeModule,
    NgTableModule,
    ButtonModule,
    TranslateModule.forChild(),
    InputTextModule,
    CalendarModule,
    FormsModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  exports: [
    NgTableModule,
    TableComponent,
    ArpaTableColumnDirective,
  ],
})
export class TableModule {
  constructor(private filterService: FilterService) {
    this.patchDateFilters();
  }

  /**
   * Patch date filter functions to handle date strings.
   * @private
   */
  private patchDateFilters() {
    this.filterService.register('dateIs', (value: any, filter: any) => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      const val = value.getTime ? value : new Date(Date.parse(value));
      return val.toDateString() === filter.toDateString();
    });
    this.filterService.register('dateIsNot', (value: any, filter: any) => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      const val = value.getTime ? value : new Date(Date.parse(value));
      return val.toDateString() !== filter.toDateString();
    });
    this.filterService.register('dateBefore', (value: any, filter: any) => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return Date.parse(value) < filter.getTime();
    });
    this.filterService.register('dateAfter', (value: any, filter: any) => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return Date.parse(value) > filter.getTime();
    });
  }
}
