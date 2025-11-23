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
    NAME: 'Physiotherapy',
  },
  API: {
    URL: process.env.NEXT_PUBLIC_API_URL!,
  },
};
