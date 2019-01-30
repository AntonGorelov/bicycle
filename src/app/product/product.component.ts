import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '../../lib/models/product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
  public product: IProduct;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.product = this._route.snapshot.data['product'];
  }
}
