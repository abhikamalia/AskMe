import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUser } from '../scripts/utils';

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user  = getUser()
    if(user === null){
      return next.handle(request);
    }
    const reqWithAuth = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    })
    return next.handle(reqWithAuth);

    
  }
}
