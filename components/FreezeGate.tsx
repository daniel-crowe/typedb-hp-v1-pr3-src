"use client";

import { useEffect } from "react";

export function FreezeGate() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("freeze") === "1") {
      document.documentElement.dataset.freeze = "1";
    }
  }, []);

  return null;
}
