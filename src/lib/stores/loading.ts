import { writable } from "svelte/store";

// Simple loading store that starts as false (no loading spinner)
function createLoadingStore() {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    setLoading: (value: boolean) => set(value),
  };
}

export const loading = createLoadingStore();
