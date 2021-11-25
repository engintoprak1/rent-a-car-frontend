import { SingleResponseModel } from './../models/singleResponseModel';
import { Color } from 'src/app/models/color';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+ 'colors/getall');
  }

  getColorById(id:number): Observable<SingleResponseModel<Color>>{
    return this.httpClient.get<SingleResponseModel<Color>>(this.apiUrl + 'colors/getbyid?id=' + id)
  }

  add(color:Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ 'colors/add',color)
  }

  delete(id:number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'colors/delete?id=' + id)
  }

  update(color:Color): Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'colors/update',color)
  }
}
