import { Clients } from "./Clients";
import { DetailsCommande } from "./DetailsCommande";

export interface Commandes {

  id?:number,
  number:string,
  date?:Date,
  status?:string,
  total?:number,
  client?:Clients
  detail_commandes?:DetailsCommande[]

}
