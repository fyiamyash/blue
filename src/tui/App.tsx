// import React, { useState } from "react";
// import { Box, Static, Text, useStdout } from "ink";
// import { Banner } from "./components/Banner";
// import { ActiveBar } from "./components/ActiveBar";

// import { theme } from "./theme";
// import { agentLoop } from "../agent/agentLoop";
// import { Inputbar } from "./components/inputBar";
// import { ThinkingDots } from "./components/ThinkingDots";
// import type { MessageContent } from "openai/resources/beta/threads.mjs";

// type StaticItem =
//   | { kind: "banner"; id: "banner" }
//   | { kind: "user"; id: number; text: string }
//   | { kind: "agent"; id: number; content: MessageContent };

// export default function App() {
//   const { stdout } = useStdout();
//   const width = stdout?.columns ?? 60;
//   const dividerWidth = Math.min(width, 160);

//   const [busy, setBusy] = useState(false);
//   const [status, setStatus] = useState("");
//   const [log, setLog] = useState<StaticItem[]>([
//     { kind: "banner", id: "banner" },
//   ]);

//   async function handleSubmit(value: string) {
//     setLog((p) => [
//       ...p,
//       { kind: "user", id: Date.now(), from: "user", text: value },
//     ]);

//     setBusy(true);
//     setStatus("thinking...");

//     const reply = (await agentLoop(value)) ?? "Sorry, I didn't get a response.";

//     setBusy(false);
//     setStatus("");

//     setLog((p) => [
//       ...p,
//       { kind: "agent", id: Date.now(), content: MessageContent },
//     ]);
//   }

//   return (
//     <Box flexDirection="column" paddingY={1}>
//       <Static items={log}>
//         {(item) =>
//           item.kind === "banner" ? (
//             <Banner key="banner" width={dividerWidth} />
//           ) : (
//             <Box
//               key={item.id}
//               flexDirection="column"
//               marginBottom={1}
//               paddingLeft={1}
//             >
//               <Text
//                 bold
//                 color={item.from === "user" ? theme.bright : theme.blue}
//               >
//                 {item.from === "user" ? "You" : "Blue"}
//               </Text>
//               <Text color={item.from === "user" ? theme.bright : theme.dim}>
//                 {item.text}
//               </Text>
//             </Box>
//           )
//         }
//       </Static>

//       {busy && status && (
//         <Box flexDirection="column" marginBottom={1} paddingLeft={1}>
//           <Text bold color={theme.blue}>
//             Blue
//           </Text>
//           <ThinkingDots />
//         </Box>
//       )}
//       <Inputbar onSubmit={handleSubmit} />
//     </Box>
//   );
// }

import React, { useState } from "react";
import { Box, Static, Text, useStdout } from "ink";
import { Banner } from "./components/Banner";

import { theme } from "./theme";
import { agentLoop } from "../agent/agentLoop";
import { Inputbar } from "./components/inputBar";
import { ThinkingDots } from "./components/ThinkingDots";
import type { MessageContent } from "../types/toolCallType"; // <-- your own type, not openai's
import { EmailListView } from "./components/EmailListView";

type StaticItem =
  | { kind: "banner"; id: "banner" }
  | { kind: "user"; id: number; text: string }
  | { kind: "agent"; id: number; content: MessageContent };

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
    setLog((p) => [...p, { kind: "user", id: Date.now(), text: value }]);

    setBusy(true);
    setStatus("thinking...");

    const reply: MessageContent = (await agentLoop(value)) ?? {
      content_type: "summary",
      value: "Sorry, I didn't get a response.",
    };

    setBusy(false);
    setStatus("");

    setLog((p) => [
      ...p,
      { kind: "agent", id: Date.now() + 1, content: reply },
    ]);
  }

  return (
    <Box flexDirection="column" paddingY={1}>
      <Static items={log}>
        {(item) =>
          item.kind === "banner" ? (
            <Banner key="banner" width={dividerWidth} />
          ) : item.kind === "user" ? (
            <Box
              key={item.id}
              flexDirection="column"
              marginBottom={1}
              paddingLeft={1}
            >
              <Text bold color={theme.bright}>
                You
              </Text>
              <Text color={theme.bright}>{item.text}</Text>
            </Box>
          ) : (
            <Box
              key={item.id}
              flexDirection="column"
              marginBottom={1}
              paddingLeft={1}
            >
              <Text bold color={theme.blue}>
                Blue
              </Text>
              {item.content.content_type === "summary" ? (
                <Text color={theme.dim}>{item.content.value}</Text>
              ) : (
                <EmailListView emails={item.content.value} />
              )}
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
