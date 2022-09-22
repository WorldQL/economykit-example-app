export type DeepMap<T, S, D> = {
  [K in keyof T]: T[K] extends S ? D : DeepMap<T[K], S, D>
}
