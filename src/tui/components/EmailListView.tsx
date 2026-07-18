import { Box, Text } from "ink";
import { theme } from "../theme";
import type { EmailSummary } from "../../types/toolCallType";

function displayName(sender: string) {
  const match = sender.match(/^(.*?)\s*<.*>$/);
  return (match?.[1] ?? sender).replace(/"/g, "").trim();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function EmailListView({ emails }: { emails: EmailSummary[] }) {
  return (
    <Box flexDirection="column">
      {emails.map((m, i) => (
        <Box key={m.id} marginBottom={1}>
          <Box width={4}>
            <Text color={theme.faint} wrap="truncate-end">
              {i + 1}
            </Text>
          </Box>
          <Box width={2}>
            <Text color={theme.blue}>{m.unread ? "●" : " "}</Text>
          </Box>
          <Box width={22}>
            <Text
              color={m.unread ? theme.bright : theme.dim}
              wrap="truncate-end"
            >
              {displayName(m.sender)}
            </Text>
          </Box>
          <Box flexGrow={1}>
            <Text
              bold={m.unread}
              color={m.unread ? theme.bright : theme.dim}
              wrap="truncate-end"
            >
              {m.subject}
            </Text>
          </Box>
          <Box width={9}>
            <Text color={theme.dim} wrap="truncate-end">
              {formatDate(m.date)}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
