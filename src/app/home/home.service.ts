import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INews } from '../../lib/models/news.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _httpClient: HttpClient) {}

  public getAllNews(): Observable<INews[]> {
    return this._httpClient.get<INews[]>('http://localhost:3000/news');
  }
}
