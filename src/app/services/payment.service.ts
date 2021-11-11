import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { CreditCard } from './../models/creditCard';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44327/api/Payments/pay';
  constructor(private httpClient:HttpClient) { }

  pay(creditCard:CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl,creditCard);
  }
}
