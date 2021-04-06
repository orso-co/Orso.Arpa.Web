import { BackButtonDirective } from './back-button.directive';
import { NavigationService } from '../../core/services/navigation.service';

describe('BackButtonDirective', () => {
  it('should create an instance', () => {
    const directive = new BackButtonDirective({} as NavigationService);
    expect(directive).toBeTruthy();
  });
});
