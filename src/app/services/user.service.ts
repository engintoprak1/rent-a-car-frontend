import { User } from 'src/app/models/user';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44327/api/users/';
  constructor(private httpClient:HttpClient) { }

  getDetails():Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "getdetails")
  }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl + "update" ,user)
  }
}
