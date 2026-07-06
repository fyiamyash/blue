import { systemPrompt } from "./systemPrompt";
import { toolDefinitions } from "./toolPrompt";

export const prompt = systemPrompt + toolDefinitions;
