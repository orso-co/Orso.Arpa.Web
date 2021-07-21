import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'arpa-userchart',
  templateUrl: './userchart.component.html',
  styleUrls: ['./userchart.component.scss']
})

export class UserchartComponent implements OnInit {
  data: any;
  options: any;
  @Input() usersWithRoleCount: number;
  @Input() usersWithoutRoleCount: number;

  constructor(){}

  public ngOnInit(): void {
      this.data = {
        labels: [ 'Mit Rolle', 'Ohne Rolle'],
        datasets: [
            {
                data: [this.usersWithRoleCount, this.usersWithoutRoleCount],
                backgroundColor: [
                  "#F4D03F",
                  "#C0392B"

                ],
                hoverBackgroundColor: [
                  "#F9E79F",
                  "#CD6155"

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
