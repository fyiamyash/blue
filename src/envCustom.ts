import "dotenv/config";

export const envCustom = {
  username: process.env.USERNAME,
  GEMINI_API_KEY: process.env.APIKEY,
  CLIENT_ID: process.env.CLIENTID,
  CLIENT_SECRET: process.env.CLIENTSECRET,
};
