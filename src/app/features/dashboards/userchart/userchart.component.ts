import { Component } from '@angular/core';

@Component({
  selector: 'arpa-userchart',
  templateUrl: './userchart.component.html',
  styleUrls: ['./userchart.component.scss']
})
export class UserchartComponent{
  data: any;

  constructor() {
    this.data = {
      labels: ['Admins','Staff','Performer', 'Without Role'],
      datasets: [
          {
              data: [2 , 1, 2, 1],
              backgroundColor: [
                  "#C0392B",
                  "#36A2EB",
                  "#F4D03F",
                  "#8E44AD"
              ],
              hoverBackgroundColor: [
                  "#CD6155",
                  "#36A2E0",
                  "#F9E79F",
                  "#BB8FCE"
              ]
          }]
      };
  }
}
