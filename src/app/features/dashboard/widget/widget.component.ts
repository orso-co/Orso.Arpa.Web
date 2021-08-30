import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'arpa-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input()
  public title: string = 'Widget';

  constructor() { }

  ngOnInit(): void {
  }

}
