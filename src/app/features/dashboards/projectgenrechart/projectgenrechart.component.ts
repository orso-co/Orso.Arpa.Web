import { Component } from '@angular/core';

@Component({
  selector: 'arpa-projectgenrechart',
  templateUrl: './projectgenrechart.component.html',
  styleUrls: ['./projectgenrechart.component.scss']
})
export class ProjectgenrechartComponent {
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Crossover','Classical','Film', 'Other'],
      datasets: [
          {
              data: [7 , 6, 2, 5],
              backgroundColor: [
                "#F4D03F",
                "#C0392B",
                "#36A2EB",
                "#8E44AD"
              ],
              hoverBackgroundColor: [
                "#F9E79F",
                "#CD6155",
                "#36A2E0",
                "#BB8FCE"
              ]
          }]
      };
    this.options = {
      title: {
        display: true,
        text: 'This is only fake data for demo',
        fontSize: 14

      },
      legend: {
        position: 'bottom'
      }
    }
  }


}
