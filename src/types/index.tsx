export type TAttacks = {
  name:string,
  type:string,
  damage:number
}
export type TEvolutions = {
  id:string,
  name:string,
  number:string,
}
export type TPokemon = {
  id:string,
  name:string,
  number:string,
  weight:{minimum:string,maximum:string},
  height:{minimum:string,maximum:string},
  attacks:{
    special:TAttacks,
    fast:TAttacks
  }
  evolutions?:TEvolutions[]
}
export type TError = {
  [key: string]: string | number | Date | null | undefined
}
type TData ={
  pokemon:TPokemon|null
}
export type TResult = {
  data:TData,
  errors?:TError[]|undefined
}
