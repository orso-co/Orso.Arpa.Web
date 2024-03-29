export const environment = {
  production: true,
  captcha: {
    key: '6Lf-AkIdAAAAAEIr-TKvo3KayGf4qTqwmsOuxMLH',
  },
  api: {
    protocol: 'https',
    baseUrl: 'orso-arpa.azurewebsites.net/api',
  },
  graphql: {
    protocol: 'https',
    baseUrl: 'orso-arpa.azurewebsites.net/graphql',
  },
  web: {
    protocol: 'https',
    baseUrl: 'orso-arpa.azurewebsites.net',
  },
  arpa: {
    url: 'http://arpa.orso.berlin/',
  },
  validation: {
    password: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,256}',
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,6}$',
  },
  config: {
    protocol: 'https',
    baseUrl: 'orso-arpa.azurewebsites.net/swagger/v1/swagger.json',
  },
  locale: {
    default: 'en',
    locales: {
      de: 'Deutsch',
      en: 'English',
      fr: 'Français',
      pt: 'Português',
      ru: 'Русский',
      ua: 'Українська',
    },
  },
};
