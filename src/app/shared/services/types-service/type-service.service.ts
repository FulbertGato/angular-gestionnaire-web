
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of, Subject } from 'rxjs';
import { TypesComplements } from '../../models/TypesComplements';
import { AuthService } from '../auth-service/auth.service';


const APIURL="https://urchin-app-3onl3.ondigitalocean.app/api/type/complement";

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  getTypes():Observable<TypesComplements[]>{
    const body = { 'token' : this.authService.getUserStorage()?.matricule}
    let data =  this.http.get<TypesComplements[]>(APIURL,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  getType(id:number):Observable<TypesComplements>{
    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<TypesComplements>(APIURL+'/'+id,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  addType(type:TypesComplements):Observable<TypesComplements>{
    const body = {

      'token' : this.authService.getUserStorage()?.matricule,
      'type': type

    };
    let data =  this.http.post<TypesComplements>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  updateType(type:TypesComplements):Observable<TypesComplements>{
    const body = {
      'token' : this.authService.getUserStorage()?.matricule,
      'type': type
    };
    let data =  this.http.put<TypesComplements>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  deleteType(type:TypesComplements):Observable<TypesComplements>{
    let  token = this.authService.getUserStorage()?.matricule
    let data =  this.http.delete<TypesComplements>(APIURL+'/'+token+'/'+type.id,{'headers':{'Content-Type':'application/json'}});
    return data

  }
}
