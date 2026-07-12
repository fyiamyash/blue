import { Box, Text, useStdout } from "ink";
import { Banner } from "./components/Banner";

export default function App() {
  const { stdout } = useStdout();

  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      <Banner />
    </Box>
  );
}
