import { Component } from '@angular/core';

@Component({
  selector: 'arpa-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
})
export class PrivacyPageComponent {

  constructor() {
  }

  close($event: Event) {
    $event.preventDefault();
    window.close();
  }

}
