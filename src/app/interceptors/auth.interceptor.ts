import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorage:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localStorage.get<string>("token")
    let newRequest : HttpRequest<any>
    newRequest = request.clone({
      headers : request.headers.set("Authorization","Bearer " + token)
    })
    return next.handle(newRequest);
  }
}
