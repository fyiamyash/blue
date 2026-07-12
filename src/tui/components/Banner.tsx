import { Box, Text } from "ink";
import { theme } from "../theme";

export function Banner() {
  return (
    <Box flexDirection="column">
      <Box>
        <Text bold color={theme.blue}>
          Blue
        </Text>
        <Text color={theme.dim}> · Your emails, quietly handled</Text>
      </Box>
      <Box
        borderStyle="single"
        borderColor={theme.faint}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />
    </Box>
  );
}
