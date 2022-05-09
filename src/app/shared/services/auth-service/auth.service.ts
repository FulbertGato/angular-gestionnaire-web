import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { Clients } from '../../models/Clients';
import { Gestionnaires } from '../../models/Gestionnaire';
import { StorageService } from '../storage/storage.service';
const APIURL="https://urchin-app-3onl3.ondigitalocean.app/api/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient,private stoServ:StorageService) { }

  getUserLoginAndPassword(user:Gestionnaires):Observable<Gestionnaires>{
    let body ={
      "email": user.email,
      "password": user.password
    };
    const user$= this.http.post<Gestionnaires>(APIURL+'/login',body,{headers:{"Content-Type":"application/json"}});
    user$.subscribe(users=>{
      if(users){
        this.stoServ.saveUser(users);
        this.isLogin.next(true);
      }
    })
    return user$;
  }

  logout(){
    this.stoServ.removeUser();
  }

  getUserStorage():Gestionnaires|null{
    return this.stoServ.getUser();
  }

  addGestionnaire(gestionnaire:Gestionnaires):Observable<Gestionnaires>{
    let user = this.getUserStorage();
    let token = user?.matricule
    let  body ={
      "token": token,
      "gestionnaire": gestionnaire
    }
    return this.http.post<Gestionnaires>(APIURL+'/ges',body,{headers:{"Content-Type":"application/json"}});
  }

  updateGestionnaire(gestionnaire:Gestionnaires):Observable<Gestionnaires>{
    let user = this.getUserStorage();
    let token = user?.matricule
    let body ={
      "token": token,
      "gestionnaire": gestionnaire
    }
    return this.http.put<Gestionnaires>(APIURL+'/ges',body,{headers:{"Content-Type":"application/json"}});
  }

  deleteGestionnaire(id:any):Observable<Gestionnaires>{
    let user = this.getUserStorage();
    let token = user?.matricule
    return this.http.delete<Gestionnaires>(APIURL+'/gestionnaires/'+token+'/'+id);
  }

  getAllGestionnaires():Observable<Gestionnaires[]>{
    let user = this.getUserStorage();
    let token = user?.matricule
    return this.http.get<Gestionnaires[]>(APIURL+'/gestionnaires/'+token);
  }

  getAllclients():Observable<Clients[]>{
    let user = this.getUserStorage();
    let token = user?.matricule
    return this.http.get<Clients[]>(APIURL+'/clients/'+token);
  }

  deleteClient(id:any):Observable<Clients>{
    let user = this.getUserStorage();
    let token = user?.matricule
    return this.http.delete<Clients>(APIURL+'/clients/'+token+'/'+id);
  }



}
