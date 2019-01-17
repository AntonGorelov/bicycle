import { Component, OnDestroy, OnInit } from '@angular/core';

import { INews } from '../../lib/models/news.interface';
import { HomeService } from './home.service';
import { SubscriptionLike } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public news: INews[];

  public $destroy: SubscriptionLike;

  constructor(private _homeService: HomeService) {}

  public ngOnInit() {
    this.$destroy = this._homeService.getAllNews().subscribe((news) => {
      this.news = news;
    });
  }

  public ngOnDestroy() {
    this.$destroy.unsubscribe();
  }
}
