import { readAttachment, readEmail } from "../tools/read";
import { searchEmail } from "../tools/search";
import { summarizeEmail } from "../tools/summarize";
import type { toolCallType } from "../types/toolCallType";

export function toolCall(toolName: toolCallType) {
  if (toolName === "readEmail") {
    readEmail();
  } else if (toolName === "readAttachment") {
    readAttachment();
  } else if (toolName === "summarizeEmail") {
    summarizeEmail();
  } else if (toolName === "searchEmail") {
    searchEmail();
  } else {
    console.log("no tool present");
  }
}
