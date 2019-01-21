import { Component, Input, OnInit } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

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
export class SliderComponent implements OnInit {
  @Input()
  public content;

  public selectedIndex: number;

  constructor() {}

  public ngOnInit() {
    this.initSlider();
  }

  public initSlider() {
    this.selectedIndex = 0;
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
