import { Component, OnInit } from '@angular/core';
import { globals } from '../../globals';

@Component({
  selector: 'app-arpalogo',
  templateUrl: './arpalogo.component.html',
  styleUrls: ['./arpalogo.component.scss']
})
export class ArpalogoComponent implements OnInit {

  arpaUrl = globals.arpaUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
