import { readAttachment, readEmail } from "../tools/read";
import { searchEmail } from "../tools/search";
import { summarizeEmail } from "../tools/summarize";
import type { toolCallType } from "../types/toolCallType";

export async function toolCall(toolName: toolCallType, args: any) {
  if (toolName === "readEmail") {
    return readEmail({ emailId: args.emailId });
  } else if (toolName === "readAttachment") {
    return readAttachment({
      emailId: args.emailId,
      fileName: args.fileName,
      attachmentId: args.attachmentId,
      mime_Type: args.mime_Type,
    });
  } else if (toolName === "summarizeEmail") {
    return summarizeEmail();
  } else if (toolName === "searchEmail") {
    return searchEmail(args);
  } else {
    console.log("no tool present");
  }
}
