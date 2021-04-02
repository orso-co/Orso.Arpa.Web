import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'arpa-piechartusers',
  templateUrl: './piechartusers.component.html',
  styleUrls: ['./piechartusers.component.css']
})
export class PiechartusersComponent implements OnInit {
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


  ngOnInit(): void {
  }

  // update(event: Event) {
  //   this.data = [] //create new data
  // }

}
