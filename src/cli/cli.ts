import { Command } from "commander";
import { callBlueCommand } from "./subCommands/callBlue";

export const program = new Command();

program
  .name("Blue")
  .description("Blue: Your email agent! ask me any thing about yout inbox")
  .addCommand(callBlueCommand);
