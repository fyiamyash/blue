import { useEffect, useState } from "react";
import { theme } from "../theme";
import { Text } from "ink";

export function Cursor({ color = theme.blue }: { color?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => !v);
    }, 520);

    return () => clearInterval(id);
  }, []);
  return <Text color={color}>{visible ? "█" : ""}</Text>;
}
