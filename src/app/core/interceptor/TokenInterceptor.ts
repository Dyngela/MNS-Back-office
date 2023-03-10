import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwt: JwtService) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("request intercepted")
    const token = this.jwt.getBearerToken();
    console.log("token = ", token)
    if (token && this.jwt.hasValidToken()) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
