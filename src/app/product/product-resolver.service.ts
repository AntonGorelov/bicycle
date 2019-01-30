import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from '../../lib/models/product.interface';
import { ProductService } from '../product.service';

@Injectable()
export class ProductResolverService implements Resolve<IProduct> {
  constructor(private _productService: ProductService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const id = route.params['id'];
    const product = this._productService.show(id);
    return product;
  }
}
