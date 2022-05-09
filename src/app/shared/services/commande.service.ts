import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commandes } from '../models/Commandes';
import { StorageService } from './storage/storage.service';
const APIURL="https://urchin-app-3onl3.ondigitalocean.app/api";
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  getCommandeById(id: any):Observable<Commandes> {
    let user = this.storage.getUser();
    let token = user?.matricule
    return this.http.get<Commandes>(APIURL+'/orders/'+token+'/'+id);
  }

  constructor(private storage:StorageService,private http:HttpClient) {  }

  getAllCommandes():Observable<Commandes[]>{
    let user = this.storage.getUser();
    let token = user?.matricule
    return this.http.get<Commandes[]>(APIURL+'/orders/'+token);
  }

  //update commande status
  updateCommandeStatus(id:any,status:any):Observable<Commandes>{
    let user = this.storage.getUser();
    let token = user?.matricule
    return this.http.get<Commandes>(APIURL+'/orders/'+token+'/'+id+'/'+status);
  }

}
