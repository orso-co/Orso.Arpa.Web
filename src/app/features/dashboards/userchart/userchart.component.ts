import { Component } from '@angular/core';

@Component({
  selector: 'arpa-userchart',
  templateUrl: './userchart.component.html',
  styleUrls: ['./userchart.component.scss']
})
export class UserchartComponent{
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Performer','Staff','Admins', 'No Role'],
      datasets: [
          {
              data: [263 , 16, 5, 42],
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
