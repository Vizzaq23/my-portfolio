"use client";

import { useState } from "react";

export default function useQuestionBlock() {
  const [used, setUsed] = useState(false);
  const [active, setActive] = useState(false);

  const triggerBlock = () => {
    if (!used) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        setUsed(true);
      }, 1200);
    }
  };

  return { used, active, triggerBlock };
}
