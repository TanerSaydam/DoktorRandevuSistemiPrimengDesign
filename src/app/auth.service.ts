import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkIsAuthenticated(){
    if(localStorage.getItem("response")) return true;

    return false;
  }
}
