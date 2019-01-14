import { Component, Input } from '@angular/core';
import { IProduct } from '../../lib/models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input()
  public product: IProduct;

  constructor() {}
}
