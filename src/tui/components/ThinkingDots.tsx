import React, { useState, useEffect } from "react";
import { Text } from "ink";
import { theme } from "../theme";

export function ThinkingDots({ label = "thinking" }: { label?: string }) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c % 3) + 1);
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <Text color={theme.blue}>
      {label}
      {".".repeat(count)}
    </Text>
  );
}
