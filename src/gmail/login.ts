import open from "open";
import express from "express";
import { google } from "googleapis";
import { envCustom } from "../envCustom";
import { generateSecretAndHash } from "./pkce";
import fs from "fs/promises";
import { CodeChallengeMethod } from "google-auth-library";

export async function oAuthLogin() {
  const { code_challenge, code_verifier } = generateSecretAndHash();
  const app = express();
  const server = new Promise<ReturnType<typeof app.listen>>((resolve) => {
    const s = app.listen(3000, "127.0.0.1", () => {
      resolve(s);
    });
  });
  const port = 3000;
  const redirectUrl = `http://127.0.0.1:${port}/callback`;

  const oAuthCLlient = new google.auth.OAuth2(
    envCustom.CLIENT_ID,
    envCustom.CLIENT_SECRET,
    redirectUrl,
  );

  if (!code_challenge) {
    return;
  }
  const authUrl = oAuthCLlient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    code_challenge,
    code_challenge_method: CodeChallengeMethod.S256,
  });

  const codePromise = new Promise<string>((resolve, reject) => {
    app.get("/callback", (req, res) => {
      const { code, error } = req.query;
      res.send(
        error
          ? `<h1>login failed ${error}</h1>`
          : `<h1>you can close this tab now</h1>`,
      );
      if (error) {
        return reject(new Error("error happened"));
      }
      if (!code) {
        return reject(new Error("code not present"));
      }
      resolve(String(code));
    });
  });

  console.log("opening the browser to login!");
  await open(authUrl);

  const code = await codePromise;
  (await server).close();

  const { tokens } = await oAuthCLlient.getToken({
    code,
    codeVerifier: code_verifier,
  });
  oAuthCLlient.setCredentials(tokens);

  await fs.writeFile("./creds.json", JSON.stringify(tokens, null, 2));
  console.log("saved credentials");

  return oAuthCLlient;
}
