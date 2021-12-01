type Maybe<T> = T | null;

declare interface Dict<V> {
  [key: string]: V;
}