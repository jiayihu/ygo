export function shuffle<T>(values: T[]): T[] {
  return values.sort(() => 0.5 - Math.random());
}
