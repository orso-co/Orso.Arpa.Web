import {Directive, HostListener} from '@angular/core';
import {NavigationService} from '../../core/services/navigation.service';

@Directive({
  selector: '[arpaBackButton]'
})
export class BackButtonDirective {
  constructor(private navigation: NavigationService) {
  }

  @HostListener('click', ['$event'])
  onClick(): void {
    this.navigation.back();
  }
}
