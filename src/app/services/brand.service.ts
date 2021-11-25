import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "brands/getall");
  }

  getBrandById(id:number): Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl + "brands/getbyid?id=" + id)
  }

  add(brand:Brand): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/add", brand)
  }

  delete(id:number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+ "brands/delete?id=" + id);
  }

  update(brand:Brand): Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+ "brands/update",brand);
  }
}
