import { Box, Text, useStdout } from "ink";
import { Banner } from "./components/Banner";
import { Cursor } from "./components/Cursor";
import { useState } from "react";
import { ActiveBar } from "./components/ActiveBar";
import { Inputbar } from "./components/inputBar";

export default function App() {
  const { stdout } = useStdout();
  const width = stdout?.columns ?? 60;
  const [busy, setBusy] = useState(true);
  const [status, setStatus] = useState("");

  function handleSubmit(value: string) {
    console.log("submitted:", value); // just to prove it works, for now
  }

  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      <Banner />
      {busy && status && <ActiveBar text={status} />}
      <Inputbar onSubmit={handleSubmit} />
    </Box>
  );
}
