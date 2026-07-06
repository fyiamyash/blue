export type toolCallType = "readEmail" | "summarizeEmail" | "readAttachment";

type responseBodyType = "tool_call" | "message";

export type responseFromAI = {
  type: responseBodyType;
  content?: string;
  tool_name?: toolCallType;
  args?: {
    string: string;
  };
};
