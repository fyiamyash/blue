import React, { useState } from "react";
import { Box, Static, Text, useStdout } from "ink";
import { Banner } from "./components/Banner";
import { ActiveBar } from "./components/ActiveBar";

import { theme } from "./theme";
import { agentLoop } from "../agent/agentLoop";
import { Inputbar } from "./components/inputBar";
import { ThinkingDots } from "./components/ThinkingDots";

type StaticItem =
  | { kind: "banner"; id: "banner" }
  | { kind: "entry"; id: number; from: "user" | "agent"; text: string };

export default function App() {
  const { stdout } = useStdout();
  const width = stdout?.columns ?? 60;
  const dividerWidth = Math.min(width, 160);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [log, setLog] = useState<StaticItem[]>([
    { kind: "banner", id: "banner" },
  ]);

  async function handleSubmit(value: string) {
    setLog((p) => [
      ...p,
      { kind: "entry", id: Date.now(), from: "user", text: value },
    ]);

    setBusy(true);
    setStatus("thinking...");

    const reply = (await agentLoop(value)) ?? "Sorry, I didn't get a response.";

    setBusy(false);
    setStatus("");

    setLog((p) => [
      ...p,
      { kind: "entry", id: Date.now() + 1, from: "agent", text: reply },
    ]);
  }

  return (
    <Box flexDirection="column" paddingY={1}>
      <Static items={log}>
        {(item) =>
          item.kind === "banner" ? (
            <Banner key="banner" width={dividerWidth} />
          ) : (
            <Box
              key={item.id}
              flexDirection="column"
              marginBottom={1}
              paddingLeft={1}
            >
              <Text
                bold
                color={item.from === "user" ? theme.bright : theme.blue}
              >
                {item.from === "user" ? "You" : "Blue"}
              </Text>
              <Text color={item.from === "user" ? theme.bright : theme.dim}>
                {item.text}
              </Text>
            </Box>
          )
        }
      </Static>

      {busy && status && (
        <Box flexDirection="column" marginBottom={1} paddingLeft={1}>
          <Text bold color={theme.blue}>
            Blue
          </Text>
          <ThinkingDots />
        </Box>
      )}
      <Inputbar onSubmit={handleSubmit} />
    </Box>
  );
}
