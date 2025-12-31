export type ConfigValue = {
  APP: {
    NAME: string;
    VERSION: string;
  },
  API: {
    URL: string;
  };
};

export const Config: ConfigValue = {
  APP: {
    NAME: 'Physio',
    VERSION: 'v1.0.0'
  },
  API: {
    URL: process.env.NEXT_PUBLIC_API_URL!,
  },
};
