import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'arpa-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {

  @Input()
  public title: string = 'Widget';
}
