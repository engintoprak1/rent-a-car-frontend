import { CarForDetail } from '../models/carForDetail';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarForList } from 'src/app/models/carForList';
import { DetailResponseModel } from '../models/detailResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient) {}

  getAllCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(): Observable<ListResponseModel<CarForList>> {
    let newPath = this.apiUrl+ 'cars/getcardetails'
    return this.httpClient.get<ListResponseModel<CarForList>>(newPath);
  }

  getCarDetailById(id:number): Observable<DetailResponseModel<CarForDetail>> {
    let newPath = this.apiUrl+ 'cars/getcardetailbyid?id=' + id;
    return this.httpClient.get<DetailResponseModel<CarForDetail>>(newPath);
  }

  getCarDetailsByBrandId(id: number): Observable<ListResponseModel<CarForList>> {
    let newPath = this.apiUrl + 'cars/getcarsbybrandid?brandId=' + id;
    return this.httpClient.get<ListResponseModel<CarForList>>(newPath);
  }

  getCarDetailsByColorId(id: number): Observable<ListResponseModel<CarForList>> {
    let newPath = this.apiUrl + 'cars/getcarsbycolorid?colorId=' + id;
    return this.httpClient.get<ListResponseModel<CarForList>>(newPath);
  }

  getCarDetailsByBrandAndColorId(brandId:number, colorId:number):Observable<ListResponseModel<CarForList>>{
    let newPath = this.apiUrl + 'cars/getcardetailsbybrandandcolorid?brandId='+ brandId + '&colorId=' +colorId;
    return this.httpClient.get<ListResponseModel<CarForList>>(newPath);
  }
}
