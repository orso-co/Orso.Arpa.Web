export const environment = {
  production: true,
  captcha: {
    key: '6LfS2X0aAAAAADWnno_N6FJzl2OhGI3ibz2EqPQQ',
  },
  api: {
    protocol: 'https',
    baseUrl: 'orso-arpa.azurewebsites.net',
  },
  web:
    {
      protocol: 'https',
      baseUrl: 'orsoarpastorage.z1.web.core.windows.net',
    },
  arpa: {
    url: 'http://arpa.orso.berlin/',
  },
  validation: {
    password: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9].{5,256}',
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$',
  },
  config: {
    url: 'http://localhost:5000/swagger/v1/swagger.json',
  },
  locale: {
    default: 'de',
  },
};
