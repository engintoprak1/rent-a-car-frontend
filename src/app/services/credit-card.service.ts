import { ListResponseModel } from './../models/listResponseModel';
import { AddForCreditCard } from './../models/addForCreditCard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient:HttpClient) { }

  save(creditCard:AddForCreditCard):Observable<AddForCreditCard>{
    return this.httpClient.post<AddForCreditCard>(this.apiUrl+'creditCards/save',creditCard);
  }

  getCards(): Observable<ListResponseModel<AddForCreditCard>> {
    return this.httpClient.get<ListResponseModel<AddForCreditCard>>(this.apiUrl+ 'creditCards/getcards');
  }

}
