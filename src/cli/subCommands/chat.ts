import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { envCustom } from "../../envCustom";
import { agentLoop } from "../../agent/agentLoop";
import type { messageType } from "../../types/messageType";

const username = envCustom.username;
export async function chatFunction() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });
  let history: messageType[] = [];
  while (true) {
    const userInput = await rl.question(`${username} >`);

    if (
      userInput.trim().toLowerCase() === "exit" ||
      userInput.trim().toLowerCase() === "q"
    ) {
      rl.close();
      break;
    }
    const reply = await agentLoop(userInput, history);
    console.log(reply);
  }
}
