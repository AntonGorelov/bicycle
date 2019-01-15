import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

import { IUser } from '../lib/models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  private _currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private _httpClient: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this._currentUserSubject.value;
  }

  public get loggedIn() {
    return localStorage.getItem('currentUser') !==  null;
  }

  public login(email: string, password: string) {
    return this._httpClient.post<any>(`http://localhost:3000/users`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._currentUserSubject.next(user);
        }
        return user;
    }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }
}
