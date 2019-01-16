import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { IUser } from '../../lib/models/user.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: IUser[] = [
      {
        id: 1,
        email: 'admin@admin.com',
        password: 'admin@admin.com',
        fName: 'Test',
        lName: 'User'
      }
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('fake-jwt-token');

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate - public
      if (request.url.endsWith('/api/users') && request.method === 'POST') {
        const user = users.find(
          x => x.email === request.body.email &&
            x.password === request.body.password
        );

        if (!user) {
          return error('Username or password is incorrect');
        }

        return ok({
          id: user.id,
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          token: `fake-jwt-token`
        });
      }

      // get all users
      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (!isLoggedIn) { return unauthorised(); }
        return ok(users);
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))
    // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // private helper functions

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
