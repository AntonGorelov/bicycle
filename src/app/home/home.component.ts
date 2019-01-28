import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';

import { INews } from '../../lib/models/news.interface';
import { HomeService } from './home.service';
import { SliderService } from '../slider/slider.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public news: INews[];
  public content = [];

  private _destroy$: SubscriptionLike;
  private _destroySlider$: SubscriptionLike;

  constructor(
    private _homeService: HomeService,
    private _sliderService: SliderService
  ) {}

  public ngOnInit() {
    this._destroy$ = this._homeService.getAllNews().subscribe((news) => {
      this.news = news;
    });
    this._destroySlider$ = this._sliderService.getSliderContent().subscribe(
      (content) => {
        this.content = content;
      }
    );
  }

  public ngOnDestroy() {
    this._destroy$.unsubscribe();
    this._destroySlider$.unsubscribe();
  }
}
