import { Injectable } from '@angular/core';
import { Gestionnaires } from '../../models/Gestionnaire';


const USERKEY="user-key";
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  saveUser(user:Gestionnaires){
    localStorage.setItem(USERKEY,JSON.stringify(user));
  }
  removeUser(){
    localStorage.removeItem(USERKEY);
  }
  getUser():Gestionnaires|null{
    const user=localStorage.getItem(USERKEY);
    return user?JSON.parse(user):null;
  }
}
