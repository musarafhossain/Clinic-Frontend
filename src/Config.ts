export type ConfigValue = {
  APP: {
    NAME: string;
  },
  API: {
    URL: string;
  };
};

export const Config: ConfigValue = {
  APP: {
    NAME: 'Phisiotherapy',
  },
  API: {
    URL: 'https://backend.musaraf.org.in/api'
  }
};
