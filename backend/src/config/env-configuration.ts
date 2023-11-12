import { resolve as resolvePath } from "path";
import { mkdir } from "fs/promises";

export interface RedisEnv {
  host: string;
  port: number;
}

export interface GoogleEnv {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export interface FortyTwoEnv {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export interface AppEnv {
  appHostName: string;
  assetsPath: string;
  imagesPath: string;
  jwtSecret: string;
  redis: RedisEnv;
  google: GoogleEnv;
  fortyTwo: FortyTwoEnv;
}

export default async function envConfigFactory(): Promise<AppEnv> {
  // assert env variables
  const requiredEnvVariables = [
    "ASSETS_PATH",
    "APP_HOSTNAME",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "JWT_SECRET",
    "REDIS_HOST",
    "REDIS_PORT",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "FORTY_TWO_CLIENT_ID",
    "FORTY_TWO_CLIENT_SECRET",
    "FORTY_TWO_CALLBACK_URL",
  ];

  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`'${variable}' env variable not found`);
    }
  });

  const assetsPath = resolvePath(process.env.ASSETS_PATH);
  process.env.ASSETS_PATH = assetsPath;

  const imagesPath = `${assetsPath}/images`;

  await mkdir(imagesPath, { recursive: true });

  return {
    appHostName: process.env.APP_HOSTNAME,
    assetsPath,
    imagesPath,
    jwtSecret: process.env.JWT_SECRET,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
    fortyTwo: {
      clientId: process.env.FORTY_TWO_CLIENT_ID,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
      callbackUrl: process.env.FORTY_TWO_CALLBACK_URL,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    },
  };
}
