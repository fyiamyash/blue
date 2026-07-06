export type messageType = {
  role: "user" | "system" | "tool_call";
  content: string;
};
