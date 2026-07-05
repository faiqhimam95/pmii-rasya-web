"use client";

import { useSyncExternalStore } from "react";

let cached = Date.now();
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function tick() {
  cached = Date.now();
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (intervalId === null) {
    intervalId = setInterval(tick, 60_000);
  }
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getSnapshot() {
  return cached;
}

function getServerSnapshot() {
  return 0;
}

/**
 * The current time as an external store: `null` until the component is
 * mounted on the client, so server-rendered output never bakes in a stale
 * build-time timestamp. The snapshot is cached between minute-ly ticks so
 * `useSyncExternalStore` doesn't see a "changed" value on every render
 * (Date.now() directly would loop forever).
 */
export function useNow(): Date | null {
  const ms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return ms ? new Date(ms) : null;
}
