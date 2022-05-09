import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of, Subject } from 'rxjs';
import { Complements } from '../../models/Complements';
import { AuthService } from '../auth-service/auth.service';
const APIURL="https://urchin-app-3onl3.ondigitalocean.app/api/complement";
@Injectable({
  providedIn: 'root'
})
export class ComplementServiceService {

  constructor(private http:HttpClient,private authService:AuthService) { }


  getComplements():Observable<Complements[]>{

    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<Complements[]>(APIURL,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  getComplement(id:number):Observable<Complements>{

    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<Complements>(APIURL+"/"+id,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  addComplement(complement:Complements):Observable<Complements>{

    const body = {
      "token": this.authService.getUserStorage()?.matricule,
      "complement": complement
    }
    let data =  this.http.post<Complements>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  updateComplement(complement:Complements):Observable<Complements>{

    const body = {
      "token": this.authService.getUserStorage()?.matricule,
      "complement": complement
    }
    let data =  this.http.put<Complements>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  deleteComplement(complement:Complements):Observable<Complements>{

    let  token = this.authService.getUserStorage()?.matricule
    let data =  this.http.delete<Complements>(APIURL+'/'+token+'/'+complement.id,{'headers':{'Content-Type':'application/json'}});
    return data

  }

}
