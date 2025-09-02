// lib/safeFetch.ts
export async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("safeFetch error:", e);
    return fallback;
  }
}
