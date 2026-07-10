import "dotenv/config";

export const envCustom = {
  username: process.env.USERNAME,
  GEMINI_API_KEY: process.env.GEMINI_APIKEY,
  OPENAI_API_KEY: process.env.OPENAI_APIKEY,
  CLIENT_ID: process.env.CLIENTID,
  CLIENT_SECRET: process.env.CLIENTSECRET,
};
