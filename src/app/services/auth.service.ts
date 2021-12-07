import { UserForLocalStorage } from './../models/userForLocalStorage';
import { LocalStorageService } from './local-storage.service';
import { TokenModel } from './../models/tokenModel';
import { Observable } from 'rxjs';
import { LoginModel } from './../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserLoginResultModel } from '../models/userLoginResultModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44327/api/auth/';
  constructor(private httpClient:HttpClient,private localStorage:LocalStorageService) { }

  login(user:LoginModel):Observable<SingleResponseModel<UserLoginResultModel>>{
    return this.httpClient.post<SingleResponseModel<UserLoginResultModel>>(this.apiUrl + "login", user)
  }

  isAuthenticated(){
    let token =this.localStorage.getString("token");
    if (token!=null) {
      return true;
    }else{
      return false;
    }
  }
}
