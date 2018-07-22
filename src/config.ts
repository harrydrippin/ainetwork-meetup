import * as dotenv from 'dotenv';

dotenv.config();

export const SERVER_HOST = process.env.SERVER_HOST!;
export const PORT = (process.env.PORT === undefined) ? 8080 : process.env.PORT!;
export const APPLICATION_SECRET = process.env.APPLICATION_SECRET!;

export const DB_HOST = process.env.DB_HOST!;
export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_NAME = process.env.DB_NAME!;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
export const GITHUB_AUTH = process.env.GITHUB_AUTH!;
export const GITHUB_CALLBACK = process.env.GITHUB_CALLBACK!;

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;