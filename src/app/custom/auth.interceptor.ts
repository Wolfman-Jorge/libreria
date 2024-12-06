import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //debugger;


  const authService = inject(AuthService);
  
  if(req.url.indexOf("login") > 0){
    return next(req);
  }

  const token = authService.getToken();
  const clonRequest = req.clone({
    setHeaders:{ Authorization: `Bearer ${token}`}
  })

  return next(clonRequest);

};
