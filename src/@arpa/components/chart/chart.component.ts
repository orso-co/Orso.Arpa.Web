import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleOrMultiDataSet } from 'ng2-charts';

@Component({
  selector: 'arpa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() data: SingleOrMultiDataSet;
  @Input() options: ChartOptions = {};
  @Input() type: ChartType;
  @Input() legend: boolean = true;
  @Input() labels: Label[];

  constructor() {
  }

  ngOnInit(): void {
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      ...this.options,
    };
  }

}
