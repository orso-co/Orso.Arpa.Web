import { Component, Input } from '@angular/core';

@Component({
  selector: 'arpa-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss'],
})
export class DummyComponent {
  @Input() icon: string;

  constructor() {
  }
}
