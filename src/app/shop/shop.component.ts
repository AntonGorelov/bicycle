import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SubscriptionLike } from 'rxjs';
import { IProduct } from '../../lib/models/product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  // host: {
  //   '[@productTrigger]': 'animationState',
  //   '(@productTrigger.start)': 'animate($event)',
  //   '(@productTrigger.done)': 'animate($event)',
  // },
  animations: [
    trigger('changeColorTrigger',
      [
        state('initial', style({
          backgroundColor: 'white',
        })),
        state('final', style({
          backgroundColor: 'green',
        })),
        transition('initial => final', [
          animate('1s')
        ]),
        transition('final => initial', [
          animate('0.5s')
        ])
      ]),
    trigger('fadeOutTrigger',
      [
        state('void', style({
          opacity: 0,
        })),
        transition('void <=> *', animate(1500)),
    ]),
    trigger('enterLeaveTrigger',
      [
        state('flyIn', style({ transform: 'translateX(0)' })),
        transition(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s 300ms ease-in')
        ]),
        transition(':leave', [
          animate('0.3s ease-out',
            style({ transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ShopComponent implements OnInit, OnDestroy {
  // @HostBinding('@productTrigger')
  public animationState = 'initial' ;

  public products: IProduct[];
  public subscription: SubscriptionLike;

  constructor(private _productService: ProductService) { }

  public ngOnInit(): void {
    this.subscription = this._productService.getAllProducts()
      .subscribe((products) => {
        this.products = products;
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public changeState() {
    this.animationState = this.animationState === 'initial' ? 'final' : 'initial';
  }

}
