import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menus } from '../../models/Menu';
import { AuthService } from '../auth-service/auth.service';
const APIURL="http://localhost:5000/api/menu";
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getMenuById(id: any) {
    return this.http.get<Menus>(APIURL+'/'+id,{'headers':{'Content-Type':'application/json'}});
  }

  constructor(private http:HttpClient,private authService:AuthService) { }

  getMenus():Observable<Menus[]>{

    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<Menus[]>(APIURL,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  getMenu(id:number):Observable<Menus>{

    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.get<Menus>(APIURL+"/"+id,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  createMenu(menu:Menus):Observable<Menus>{

    const body = {
      "token": this.authService.getUserStorage()?.matricule,
      "menu": menu
    };
    let data =  this.http.post<Menus>(APIURL,body,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  updateMenu(menu:Menus):Observable<Menus>{

    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.put<Menus>(APIURL,menu,{'headers':{'Content-Type':'application/json'}});
    return data

  }

  deleteMenu(id:number):Observable<Menus>{

    const body = { 'token' : this.authService.getUserStorage()?.matricule };
    let data =  this.http.delete<Menus>(APIURL+"/"+id,{'headers':{'Content-Type':'application/json'}});
    return data

  }
}
