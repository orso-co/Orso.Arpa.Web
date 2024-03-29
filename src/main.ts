import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    let splashScreen = document.getElementById('app-loader');
    if (splashScreen) {
      splashScreen.setAttribute('class', 'done');
      setTimeout(() => { // @ts-ignore
        splashScreen.remove();
      }, 1500);
    }
  })
  .catch(err => {
    const messageElement = document.querySelector('#message');
    let message = 'Application initialization failed';
    if (err && messageElement) {
      if (err.message) {
        message = message + ': ' + err.message;
      } else {
        message = message + ': ' + err;
      }
      messageElement.textContent = message;
    }
  });
