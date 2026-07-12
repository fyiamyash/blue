import { Text } from "ink";
import { theme } from "../theme.js";

export function ActiveBar({
  text,
  width = 60,
}: {
  text: string;
  width?: number;
}) {
  const padded = ` ${text} `.padEnd(width);
  return <Text color={theme.bright}>{padded}</Text>;
}
