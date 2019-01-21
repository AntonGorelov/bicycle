import { Component, OnDestroy, OnInit } from '@angular/core';

import { INews } from '../../lib/models/news.interface';
import { HomeService } from './home.service';
import { SubscriptionLike } from 'rxjs';
import {SliderService} from '../slider/slider.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public news: INews[];
  public content = [];

  public $destroy: SubscriptionLike;
  public $destroySlider: SubscriptionLike;

  constructor(private _homeService: HomeService, private _sliderService: SliderService) {}

  public ngOnInit() {
    this.$destroy = this._homeService.getAllNews().subscribe((news) => {
      this.news = news;
    });
    this.$destroySlider = this._sliderService.getSliderContent().subscribe(
      (content) => {
        this.content = content;
      }
    );
  }

  public ngOnDestroy() {
    this.$destroy.unsubscribe();
    this.$destroySlider.unsubscribe();
  }
}
