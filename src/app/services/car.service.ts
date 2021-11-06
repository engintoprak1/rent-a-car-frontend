import { CarForDetailModel } from './../models/carForDetailModel';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { DetailResponseModel } from '../models/detailResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl+ 'cars/getcardetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailById(id:number): Observable<DetailResponseModel<CarForDetailModel>> {
    let newPath = this.apiUrl+ 'cars/getcardetailbyid?id=' + id;
    return this.httpClient.get<DetailResponseModel<CarForDetailModel>>(newPath);
  }

  getCarDetailsByBrandId(id: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcarsbybrandid?brandId=' + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByColorId(id: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcarsbycolorid?colorId=' + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
