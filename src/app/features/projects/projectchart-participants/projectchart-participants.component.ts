import { Component } from '@angular/core';

@Component({
  selector: 'arpa-projectchart-participants',
  templateUrl: './projectchart-participants.component.html',
  styleUrls: ['./projectchart-participants.component.scss']
})
export class ProjectchartParticipantsComponent {

  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Zusagen','Absagen','Unsicher', 'Offen'],
      datasets: [
          {
              data: [93 , 21, 42, 180],
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
