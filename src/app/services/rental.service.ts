import { AddForRental } from './../models/addForRental';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44327/api/rentals/'
  constructor(private httpClient :HttpClient) { }

  getRentals() : Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getall")
  }

  getRentalDetails() : Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl+"getrentaldetails")
  }

  addRental(addForRental:AddForRental){
    return this.httpClient.post<ResponseModel>(this.apiUrl +"add",addForRental);
  }

}
