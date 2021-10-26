import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailResponseModel } from '../models/rentalDetailResponseModel';
import { RentalResponseModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44327/api/rentals/'
  constructor(private httpClient :HttpClient) { }

  getRentals() : Observable<RentalResponseModel>{
    return this.httpClient.get<RentalResponseModel>(this.apiUrl+"getall")
  }

  getRentalDetails() : Observable<RentalDetailResponseModel>{
    return this.httpClient.get<RentalDetailResponseModel>(this.apiUrl+"getrentaldetails")
  }
}
