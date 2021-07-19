import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';

@Directive({
  selector: '[arpaCloseButton]',
})
export class CloseButtonDirective {
  constructor(private navigation: NavigationService) {
  }

  @HostListener('click', ['$event'])
  onClick(): void {
    this.navigation.close();
  }
}
