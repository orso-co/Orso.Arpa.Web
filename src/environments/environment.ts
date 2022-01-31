// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  captcha: {
    key: '6Le-g3QaAAAAAJmIN-s37441yuZPBp1M7nqUwtED',
  },
  api: {
    protocol: 'http',
    baseUrl: 'localhost:5000/api',
  },
  graphql: {
    protocol: 'http',
    baseUrl: 'localhost:5000/graphql',
  },
  web: {
    protocol: 'http',
    baseUrl: 'localhost:4200',
  },
  arpa: {
    url: 'http://arpa.orso.berlin/',
  },
  validation: {
    password: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\\[\\]:;<>,.?/~_+-=|]).{5,256}',
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,6}$',
  },
  config: {
    protocol: 'http',
    baseUrl: 'localhost:5000/swagger/v1/swagger.json',
  },
  locale: {
    default: 'en',
    locales: {
      'de': 'Deutsch',
      'en': 'Englisch',
      'pt': 'Portugiesisch',
      'fr': 'Französisch',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
