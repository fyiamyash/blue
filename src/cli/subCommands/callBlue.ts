import { Command } from "commander";
import { envCustom } from "../../envCustom";
import { chatFunction } from "./chat";
import { oAuthLogin } from "../../gmail/login";
import fs from "fs/promises";

export const callBlueCommand = new Command("blue");

const username = envCustom.username;

callBlueCommand.description("ask me anything about emails").action(async () => {
  let tokens;
  try {
    const data = await fs.readFile("./creds.json", "utf-8");
    tokens = JSON.parse(data);
  } catch {
    await oAuthLogin();

    const data = await fs.readFile("./creds.json", "utf8");
    tokens = JSON.parse(data);
  }
  console.log(`blue > hello ${username} how can i help you today?`);
  await chatFunction();
});
