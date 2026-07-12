import { Box, Text, useInput } from "ink";
import { useState } from "react";
import { theme } from "../theme";
import { Cursor } from "./Cursor";

export function Inputbar({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("");
  useInput((input, key) => {
    if (key.return) {
      const trimmed = value.trim();
      setValue("");
      if (trimmed) onSubmit(trimmed);
      return;
    }
    if (key.backspace || key.delete) {
      setValue((v) => v.slice(0, -1));
      return;
    }
    if (key.ctrl || key.meta || key.escape) {
      return;
    }
    setValue((v) => v + input);
  });
  return (
    <Box>
      <Text color={theme.blue}>{"> "}</Text>
      <Text color={theme.bright}>{value}</Text>
      <Cursor />
    </Box>
  );
}
