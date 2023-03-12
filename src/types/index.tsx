
export type TPokemon = {
  [key: string]: string | number | Date | null | undefined
}
export type TError = {
  [key: string]: string | number | Date | null | undefined
}

export type TResult = {
  data:TPokemon,
  errors?:TError[]|undefined
}
