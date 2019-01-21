import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {

  public $destroy: SubscriptionLike;

  constructor() {}

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.$destroy.unsubscribe();
  }
}
