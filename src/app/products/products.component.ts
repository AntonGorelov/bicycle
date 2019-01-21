import { Component, Input } from '@angular/core';
import { IProduct } from '../../lib/models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @Input()
  public products: IProduct[];

  constructor() {}
}
