import { Produits } from "./Produits";

export interface DetailsCommande {
 quantity?:number,
 price?:number,
  produit?:Produits,
  total?:number
}
