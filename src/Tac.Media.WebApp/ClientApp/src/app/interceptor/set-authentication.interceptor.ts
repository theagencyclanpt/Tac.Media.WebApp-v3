import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class SetAuthenticationInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("token");

    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return newRequest.handle(cloned);
    }
    else {
      return newRequest.handle(request);
    }
  }
}