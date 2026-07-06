import { envCustom } from "../envCustom";
import type { messageType } from "../types/messageType";
import type { responseFromAI } from "../types/toolCallType";
import { prompt } from "./planner";
import { GoogleGenAI } from "@google/genai";
import { toolCall } from "./toolCall";

const ai = new GoogleGenAI({ apiKey: envCustom.GEMINI_API_KEY });

export async function agentLoop(userInput: string) {
  const message: messageType[] = [];
  message.push({
    role: "system",
    content: prompt,
  });
  message.push({ role: "user", content: userInput });
  while (true) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: JSON.stringify(message),
    });
    if (!response) {
      console.log("no response from AI");
      continue;
    }
    if (response && response.text) {
      console.log(response.text);
      const currentResp: responseFromAI = JSON.parse(response.text);
      if (currentResp.type === "message") {
        console.log(currentResp.content);
        break;
      } else if (currentResp.type === "tool_call") {
        const toolcallResp = toolCall(currentResp.tool_name!);
      }
    }
  }
}
