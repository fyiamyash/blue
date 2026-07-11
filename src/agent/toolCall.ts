import { readAttachment, readEmail } from "../tools/read";
import { searchEmail } from "../tools/search";
import { summarizeEmail } from "../tools/summarize";
import type { toolCallType } from "../types/toolCallType";

export async function toolCall(toolName: toolCallType, args: {}) {
  if (toolName === "readEmail") {
    return readEmail(args);
  } else if (toolName === "readAttachment") {
    return readAttachment();
  } else if (toolName === "summarizeEmail") {
    return summarizeEmail();
  } else if (toolName === "searchEmail") {
    return searchEmail(args);
  } else {
    console.log("no tool present");
  }
}
