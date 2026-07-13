import { Box, Text } from "ink";
import { theme } from "../theme";
import type { EmailSummary } from "../../types/toolCallType";

function truncate(text: string, width: number) {
  return text.length > width ? text.slice(0, width - 1) + "…" : text;
}

function displayName(sender: string) {
  const match = sender.match(/^(.*?)\s*<.*>$/);
  return (match?.[1] ?? sender).replace(/"/g, "").trim();
}

export function EmailListView({ emails }: { emails: EmailSummary[] }) {
  return (
    <Box flexDirection="column">
      {emails.map((m) => (
        <Box key={m.id}>
          <Box width={3}>
            <Text color={theme.faint}>{m.id}</Text>
          </Box>
          <Box width={2}>
            <Text color={theme.blue}>{m.unread ? "●" : " "}</Text>
          </Box>
          <Box width={22}>
            <Text color={m.unread ? theme.bright : theme.dim}>
              {truncate(displayName(m.sender), 21)}
            </Text>
          </Box>
          <Box flexGrow={1}>
            <Text bold={m.unread} color={m.unread ? theme.bright : theme.dim}>
              {truncate(m.subject, 45)}
            </Text>
          </Box>
          <Box width={12}>
            <Text color={theme.dim}>{m.date}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
