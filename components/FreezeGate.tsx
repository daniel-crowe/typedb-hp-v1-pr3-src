"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribeSearch(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readSearchFreeze(): boolean {
  return new URLSearchParams(window.location.search).get("freeze") === "1";
}

function serverSearchFreeze(): boolean {
  return false;
}

export function FreezeGate() {
  const freeze = useSyncExternalStore(subscribeSearch, readSearchFreeze, serverSearchFreeze);

  useEffect(() => {
    if (freeze) {
      document.documentElement.dataset.freeze = "1";
      return;
    }
    delete document.documentElement.dataset.freeze;
  }, [freeze]);

  return null;
}
