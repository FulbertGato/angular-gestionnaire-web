import { Burgers } from "./Burgers";
import { Complements } from "./Complements";

export interface Menus {
  id?:number,
  name:string,
  code:string,
  description?:string,
  status:boolean,
  price : number,
  cookingTime : string,
  burger?:Burgers,
  complements:Complements[],
}
