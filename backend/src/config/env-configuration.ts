export interface DatabaseEnv {
  user: string;
  password: string;
  host: string;
  port: number;
}

export interface AppEnv {
  database: DatabaseEnv;
}

export default function envConfigFactory(): AppEnv {
  return {
    database: {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
    },
  };
}
