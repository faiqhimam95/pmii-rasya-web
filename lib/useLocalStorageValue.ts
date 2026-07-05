"use client";

import { useSyncExternalStore } from "react";

function noopSubscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

/** Reads a localStorage key as an external store (client-only, no effects). */
export function useLocalStorageValue(key: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(key),
    getServerSnapshot
  );
}
