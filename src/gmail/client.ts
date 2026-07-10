import { google } from "googleapis";
import { oAuthLogin } from "./login";
import fs from "fs/promises";
import { envCustom } from "../envCustom";
const CREDS_PATH = "./creds.json";

async function saveCredentials(tokens: any) {
  await fs.writeFile(CREDS_PATH, JSON.stringify(tokens, null, 2));
}

async function loadCredentials() {
  try {
    const raw = await fs.readFile(CREDS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function getGmailClient() {
  const creds = await loadCredentials();

  if (!creds) {
    const oauth = await oAuthLogin();

    return google.gmail({
      version: "v1",
      auth: oauth,
    });
  }
  const oauthClient = new google.auth.OAuth2(
    envCustom.CLIENT_ID,
    envCustom.CLIENT_SECRET,
  );
  oauthClient.setCredentials(creds);

  const isExpired =
    !creds.expiry_date || Date.now() > creds.expiry_date - 30_000;

  if (isExpired) {
    try {
      const { credentials: refreshed } = await oauthClient.refreshAccessToken();
      await saveCredentials({ ...creds, ...refreshed });
      oauthClient.setCredentials(refreshed);
    } catch {
      const oauth = await oAuthLogin();
      return google.gmail({ version: "v1", auth: oauth });
    }
  }

  return google.gmail({ version: "v1", auth: oauthClient });
}
