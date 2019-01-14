import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../lib/models/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private _httpClient: HttpClient) { }

  public getAllProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>('http://localhost:3001/bicycles');
  }
}
