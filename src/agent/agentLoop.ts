import { envCustom } from "../envCustom";
import type { messageType } from "../types/messageType";
import type { responseFromAI } from "../types/toolCallType";
import { prompt } from "./planner";
import OpenAI from "openai";
import { toolCall } from "./toolCall";

// const ai = new GoogleGenAI({ apiKey: envCustom.GEMINI_API_KEY });
const client = new OpenAI({ apiKey: envCustom.OPENAI_API_KEY });

export async function agentLoop(userInput: string, history: messageType[]) {
  // const message: messageType[] = [];
  const message: messageType[] = [
    ...history,
    { role: "user", content: userInput },
  ];
  // message.push({
  //   role: "system",
  //   content: prompt,
  // });
  message.push({ role: "user", content: userInput });
  while (true) {
    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: JSON.stringify(message),
    // });
    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions: JSON.stringify(prompt),
      input: JSON.stringify(message),
      // stream: true,
    });
    if (!response) {
      console.log("no response from AI");
      continue;
    }
    if (response && response.output_text) {
      const currentResp: responseFromAI = JSON.parse(response.output_text);
      if (currentResp.type === "message") {
        // console.log(currentResp.content);

        // return currentResp.content;
        message.push({ role: "system", content: JSON.stringify(currentResp) });
        return { content: currentResp.content, history: message };
        // break;
      } else if (currentResp.type === "tool_call") {
        // const toolcallResp = await toolCall(
        //   currentResp.tool_name!,
        //   currentResp.args!,
        // );
        // message.push({
        //   role: "tool_call",
        //   content: JSON.stringify(toolcallResp),
        // });
        const toolcallResp = await toolCall(
          currentResp.tool_name!,
          currentResp.args!,
        );
        message.push({ role: "system", content: JSON.stringify(currentResp) });
        message.push({
          role: "tool_call",
          content: JSON.stringify(toolcallResp),
        });
      }
    }
  }
}
