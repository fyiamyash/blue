export interface EmailSummary {
  id: number;
  sender: string;
  subject: string;
  date: string;
  unread: boolean;
}

export type MessageContent =
  | { content_type: "summary"; value: string }
  | { content_type: "email"; value: EmailSummary[] };

export type responseFromAI =
  | { type: "message"; content: MessageContent }
  | {
      type: "tool_call";
      tool_name: toolCallType;
      args: {
        string: string;
      };
    };

export type toolCallType = "readEmail" | "readAttachment";

type responseBodyType = "tool_call" | "message";

// export type responseFromAI = {
//   type: responseBodyType;
//   content?: string;
//   tool_name?: toolCallType;
// args?: {
//   string: string;
// };
// };
