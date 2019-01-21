import {Component, OnDestroy, OnInit} from '@angular/core';
import { IProduct } from '../../lib/models/product.interface';
import {ProductService} from '../product.service';
import {ID} from '../../lib/models/entity.interface';
import {Subscription, SubscriptionLike} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public product: IProduct;

  public $destroy: SubscriptionLike;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.showProduct(this._route.snapshot.params.id);
  }

  public ngOnDestroy() {
    this.$destroy.unsubscribe();
  }

  public showProduct(id: ID) {
    this.$destroy = this._productService.show(id).subscribe(
      (product) => {
        this.product = product;
      }
    );
  }
}
