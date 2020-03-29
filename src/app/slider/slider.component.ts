import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', group([
        query(':enter', [
          style({
            transform: 'translateX(100%)'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            transform: 'translateX(-100%)'
          }))
        ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            transform: 'translateX(-100%)'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            transform: 'translateX(100%)'
          }))
        ])
      ]))
    ])
  ]
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input()
  public content;

  public selectedIndex: number;
  private _selected$;
  private _destroyed$ = new Subject<void>();

  constructor() {}

  public ngOnInit() {
    this.initSlider();
    this.autoSelect();
  }

  public ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public initSlider() {
    this.selectedIndex = 0;
  }

  public autoSelect() {
    this._selected$ = timer(1000, 3000);
    this._selected$
        .pipe(takeUntil(this._destroyed$))
        .subscribe(() => {
          this.nextSlide();
    });
  }

  public setCurrentSlideIndex(index) {
    this.selectedIndex = index;
  }
  public isCurrentSlideIndex(index) {
    return this.selectedIndex === index;
  }

  public prevSlide() {
    this.selectedIndex = (this.selectedIndex > 0) ? --this.selectedIndex : this.content.length - 1;
  }

  public nextSlide() {
    this.selectedIndex = (this.selectedIndex < this.content.length - 1) ? ++this.selectedIndex : 0;
  }
}
