import { google } from "googleapis";
import { oAuthLogin } from "./login";

export async function getGmailClient() {
  const oauth = oAuthLogin();

  const gmail = google.gmail({
    version: "v1",
    auth: await oauth,
  });
  return gmail;
}
