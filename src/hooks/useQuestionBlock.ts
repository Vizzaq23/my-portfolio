"use client";

import { useState } from "react";

export default function useQuestionBlock() {
  const [used, setUsed] = useState(false);
  const [coinKey, setCoinKey] = useState(0); // unique key for each coin instance

  const triggerBlock = () => {
    if (!used) {
      setUsed(true); // only switch sprite the first time
    }
    // always trigger a new coin pop
    setCoinKey((prev) => prev + 1);
  };

  return { used, coinKey, triggerBlock };
}
