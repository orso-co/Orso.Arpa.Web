import { PrimeNGConfig } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'arpa-calendar-sheet',
  templateUrl: './calendar-sheet.component.html',
  styleUrls: ['./calendar-sheet.component.scss'],
})
export class CalendarSheetComponent implements OnInit {
  @Input() date: string = '';
  calendarDate: Date = new Date();

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.calendarDate = new Date(this.date);
  }

  get monthName(): string {
    return this.primengConfig.getTranslation('monthNames')[this.calendarDate.getMonth()];
  }

  get weekDay(): string {
    return this.primengConfig.getTranslation('dayNames')[this.calendarDate.getDay()];
  }

  get IsPassed(): boolean {
    return this.calendarDate < new Date();
  }
}
