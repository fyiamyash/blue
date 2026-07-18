import { Command } from "commander";
import { envCustom } from "../../envCustom";
import { chatFunction } from "./chat";
import { oAuthLogin } from "../../gmail/login";
import fs from "fs/promises";
import { render } from "ink";
import React from "react";
import App from "../../tui/App";

export const callBlueCommand = new Command("blue");

const username = envCustom.username;

callBlueCommand.description("ask me anything about emails").action(async () => {
  let tokens;
  try {
    const data = await fs.readFile("./creds.json", "utf-8");
    tokens = JSON.parse(data);
  } catch {
    await oAuthLogin();
    console.log("call auth function");

    const data = await fs.readFile("./creds.json", "utf8");
    if (!data) {
      console.log("there is no creds file here redirect to login!");
    }
    tokens = JSON.parse(data);
  }

  // await chatFunction();
  render(React.createElement(App));
});
