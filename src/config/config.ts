import dotenv from 'dotenv';
import * as process from "process";
dotenv.config();

export const PORT = parseInt(process.env.PORT ? process.env.PORT : '8080');
export const AUTHENTICATION_TOKEN = process.env.AUTHENTICATION_TOKEN || "onlyvim2024";