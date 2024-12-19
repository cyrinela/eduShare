import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function myHttpInterceptor(req: HttpRequest<unknown>,next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  
  //console.log(req.url);

  return next(req).pipe(
    tap({
      next: (event) => {},
      error: (error) => {
        // (Unauthorized status)
        const isCookieEmpty = !document.cookie.split('; ').find((row) => row.startsWith('auth='));
        if (error.status === 401 && isCookieEmpty) {
          alert("Account needed to access EduShare.\n Please check your authentication.");
          router.navigate(['/login']);
        }
        // (forbidden status)
        else if (error.status === 403) {
          alert("Account is not Authorized here.\n Please contact admin for more priveleges.");
        }
      },
    })
  );
}
