import { Injectable } from '@angular/core';
import { IUser } from '../../lib/models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  public get getUser(): IUser {
    return this._sessionUser;
  }

  private _sessionUser: IUser;

  constructor() {}
}
