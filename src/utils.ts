type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export function debounce<F extends (...params: Array<any>) => void>(fn: F, delay: number): F {
  let timer: number;

  return function(this: any, ...args: Array<any>) {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export function emptyEl(node: Node): void {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function omit<T extends Record<string, any>, K extends string[]>(
  obj: T,
  keys: K
): Omit<T, K> {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];

        return acc;
      },
      {} as Omit<T, K>
    );
}

export function shuffle<T>(values: T[]): T[] {
  return values.sort(() => 0.5 - Math.random());
}
