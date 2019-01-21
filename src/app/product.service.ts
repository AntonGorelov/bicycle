import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../lib/models/product.interface';
import { ID } from '../lib/models/entity.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private _httpClient: HttpClient) { }

  public list(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>('/api/bicycles');
  }

  public show(id: ID): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`/api/bicycles/${id}`);
  }
}
