import { Component, Input } from '@angular/core';

@Component({
  selector: 'arpa-testchild',
  templateUrl: './testchild.component.html',
  styleUrls: ['./testchild.component.scss']
})
export class TestchildComponent {
  @Input() usersWithRoleCount: number;
  @Input() usersWithoutRoleCount: number;
  @Input() usersTotalCount: number;

  constructor() { }



}
