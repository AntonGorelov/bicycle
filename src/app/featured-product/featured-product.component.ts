import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../lib/models/product.interface';

@Component({
  selector: 'app-featured-product',
  templateUrl: 'featured-product.component.html',
  styleUrls: ['featured-product.component.scss'],
})
export class FeaturedProductComponent implements OnInit {
  @Input()
  public product: IProduct;

  constructor() {}

  public ngOnInit() {}
}
