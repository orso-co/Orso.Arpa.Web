import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'arpa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: any;

  @Input() values: number[];
  @Input() options: ChartOptions = {};
  @Input() type: ChartType;
  @Input() legend: boolean = true;
  @Input() labels: string[];

  pieChartPlugins = [DatalabelsPlugin];

  ngOnInit(): void {
    if (this.values?.length) {
      this.updateDataset();
    }
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: 'white',
          formatter: (value) => {
            return value;
          },
        },
      },
      ...this.options,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.values?.currentValue !== changes.values?.previousValue && changes.values.currentValue) {
      this.updateDataset();
    }
  }

  private updateDataset() {
    setTimeout(() => (this.data = [{ data: this.values }]));
  }
}
