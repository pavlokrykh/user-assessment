import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getToken() || sessionStorage.getItem('userToken');

    if (token) {
      const authRequest = req.clone({
        headers: req.headers.set('X-Token', token)
      });
      return next.handle(authRequest);
    } 
    else if (!token) {
      // Redirect back to login page if there is no token
      this.router.navigate(['/login']);
    }

    return next.handle(req);
  }
}
