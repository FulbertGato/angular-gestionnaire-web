import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Burgers } from '../../models/Burgers';
const APIURL="http://localhost:5000/api/burger";
@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  constructor(private http:HttpClient) {}

  getBurgers():Observable<Burgers[]>{

    const body = { 'token' : '1234' };
    let data =  this.http.get<Burgers[]>(APIURL,{'headers':{'Content-Type':'application/json'}});

    return data

  }

  getBurger(id:number):Observable<Burgers>{
    const body = { 'token' : '1234' };
    let data =  this.http.get<Burgers>(APIURL+"/"+id,{'headers':{'Content-Type':'application/json'}});

    return data
  }

  addBurger(burger:Burgers):Observable<Burgers>{
    //const body = { 'token' : '1234', 'burger':burger };
    const body = {
      "token": "74588",
      "burger": burger
    };

    let data =  this.http.post<Burgers>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data
  }

  updateBurger(burger:Burgers):Observable<Burgers>{
    const body = { 'token' : '1234', 'burger':burger };
    let data =  this.http.put<Burgers>(APIURL,body,{'headers':{'Content-Type':'application/json'}});

    return data
  }

  deleteBurger(burger:Burgers):Observable<Burgers>{
    let token = '1234';
    let data =  this.http.delete<Burgers>(APIURL+"/"+token+"/"+burger.id,{'headers':{'Content-Type':'application/json'}});
    return data
  }

}
