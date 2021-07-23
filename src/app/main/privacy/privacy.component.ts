import { Component } from '@angular/core';

@Component({
  selector: 'arpa-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {

  constructor() {
  }

  close($event: Event) {
    $event.preventDefault();
    window.close();
  }

}
