import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Burgers } from '../../models/Burgers';
import { AuthService } from '../auth-service/auth.service';
const APIURL="https://urchin-app-3onl3.ondigitalocean.app/api/burger";
@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  constructor(private http:HttpClient,private authService:AuthService) {}

  getBurgers():Observable<Burgers[]>{

    const body = { 'token' :this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<Burgers[]>(APIURL,{'headers':{'Content-Type':'application/json'}});

    return data

  }

  getBurger(id:number):Observable<Burgers>{
    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<Burgers>(APIURL+"/"+id,{'headers':{'Content-Type':'application/json'}});

    return data
  }

  addBurger(burger:Burgers):Observable<Burgers>{
    const body = {
      "token": this.authService.getUserStorage()?.matricule,
      "burger": burger
    };

    let data =  this.http.post<Burgers>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data
  }

  updateBurger(burger:Burgers):Observable<Burgers>{
    const body = { 'token' : this.authService.getUserStorage()?.matricule, 'burger':burger };
    let data =  this.http.put<Burgers>(APIURL,body,{'headers':{'Content-Type':'application/json'}});

    return data
  }

  deleteBurger(burger:Burgers):Observable<Burgers>{
    let token = this.authService.getUserStorage()?.matricule;
    let data =  this.http.delete<Burgers>(APIURL+"/"+token+"/"+burger.id,{'headers':{'Content-Type':'application/json'}});
    return data
  }

}
