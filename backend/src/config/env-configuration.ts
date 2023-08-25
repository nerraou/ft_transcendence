import { resolve as resolvePath } from "path";
import { mkdir } from "fs/promises";

export interface RedisEnv {
  host: string;
  port: number;
}

export interface AppEnv {
  appHostName: string;
  assetsPath: string;
  jwtSecret: string;
  redis: RedisEnv;
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
  ];

  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(" env variable not found");
    }
  });

  const assetsPath = resolvePath(process.env.ASSETS_PATH);
  process.env.ASSETS_PATH = assetsPath;

  await mkdir(assetsPath, { recursive: true });

  return {
    appHostName: process.env.APP_HOSTNAME,
    assetsPath,
    jwtSecret: process.env.JWT_SECRET,
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    },
  };
}
