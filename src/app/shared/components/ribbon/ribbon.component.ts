import { Component, Input } from '@angular/core';

@Component({
  selector: 'arpa-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss']
})
export class RibbonComponent {
  @Input()severity: "primary" | "success" | "info" | "warning" | "danger" = "primary";
  @Input()contentKey: string;
}
