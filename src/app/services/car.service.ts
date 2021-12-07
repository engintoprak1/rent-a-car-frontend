import { AddForCar } from './../models/addForCar';
import { CarForDetail } from '../models/carForDetail';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarForList } from 'src/app/models/carForList';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient) {}

  add(car:AddForCar): Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  delete(id:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete?id=" + id;
    return this.httpClient.delete<ResponseModel>(newPath)
  }
  update(car:AddForCar):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.put<ResponseModel>(newPath,car)
  }


  getCarById(id:number): Observable<SingleResponseModel<CarForList>>{
    let newPath = this.apiUrl + 'cars/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CarForList>>(newPath);
  }

  getCarDetails(): Observable<ListResponseModel<CarForList>> {
    let newPath = this.apiUrl+ 'cars/getcardetails'
    return this.httpClient.get<ListResponseModel<CarForList>>(newPath);
  }

  getCarDetailById(id:number): Observable<SingleResponseModel<CarForDetail>> {
    let newPath = this.apiUrl+ 'cars/getcardetailbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<CarForDetail>>(newPath);
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
