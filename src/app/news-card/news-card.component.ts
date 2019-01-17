import { Component, Input } from '@angular/core';
import { INews } from '../../lib/models/news.interface';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input()
  public news: INews;

  constructor() {}
}
